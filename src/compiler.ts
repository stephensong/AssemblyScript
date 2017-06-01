import "byots";
import * as ast from "./ast";
import * as base64 from "@protobufjs/base64";
import { createDiagnosticForNode, printDiagnostic } from "./diagnostics";
import { libSource, mallocBlob } from "./library";
import * as path from "path";
import { Profiler } from "./profiler";
import { byteType, sbyteType, shortType, ushortType, intType, uintType, longType, ulongType, boolType, floatType, doubleType, uintptrType32, uintptrType64, voidType } from "./types";
import { isImport, isExport, isConst, isStatic, signatureIdentifierOf, binaryenTypeOf, binaryenOneOf, binaryenZeroOf, arrayTypeOf, getWasmType, setWasmType, getWasmFunction, setWasmFunction } from "./util";
import { binaryen } from "./wasm";
import * as wasm from "./wasm";

const MEM_MAX_32 = (1 << 16) - 1; // 65535 (pageSize) * 65535 (n) ^= 4GB

const tsCompilerOptions = <ts.CompilerOptions>{
  target: ts.ScriptTarget.Latest,
  module: ts.ModuleKind.None,
  noLib: true,
  experimentalDecorators: true,
  types: []
};

// Set up malloc once
const mallocBuffer = new Uint8Array(base64.length(mallocBlob));
base64.decode(mallocBlob, mallocBuffer, 0);

const defaultUintptrSize = 4;

interface CompilerOptions {
  uintptrSize?: number;
  noLib?: boolean;
}

// Rule #1: This is a compiler, not an optimizer. Makes life a lot easier.

export class Compiler {
  program: ts.Program;
  checker: ts.TypeChecker;
  entryFile: ts.SourceFile;
  diagnostics: ts.DiagnosticCollection;
  noLib: boolean;
  uintptrSize: number;
  uintptrType: wasm.Type;
  module: binaryen.Module;
  signatures: { [key: string]: binaryen.Signature } = {};
  constants: { [key: string]: wasm.Constant } = {};
  globalInitializers: binaryen.Expression[] = [];
  globals: { [key: string]: wasm.Global } = {};
  userStartFunction?: binaryen.Function;
  profiler = new Profiler();
  currentFunction: wasm.Function;
  currentLocals: { [key: string]: wasm.Variable };
  currentBreakContextNumber = 0;
  currentBreakContextDepth = 0;
  currentPrefix?: string;

  static compileFile(filename: string, options?: CompilerOptions): binaryen.Module | null {
    const program = ts.createProgram([ __dirname + "/../assembly.d.ts", filename ], tsCompilerOptions);
    return Compiler.compileProgram(program, options);
  }

  static compileString(source: string, options?: CompilerOptions): binaryen.Module | null {
    const sourceFileName = "module.ts";
    const sourceFile = ts.createSourceFile(sourceFileName, source, ts.ScriptTarget.Latest);
    const libraryFileName = "assembly.d.ts";
    const libraryFile = ts.createSourceFile(libraryFileName, libSource, ts.ScriptTarget.Latest);

    const program = ts.createProgram([ libraryFileName, sourceFileName ], tsCompilerOptions, <ts.CompilerHost>{
      getSourceFile: (fileName) => fileName === sourceFileName ? sourceFile : fileName === libraryFileName ? libraryFile : undefined,
      getDefaultLibFileName: () => libraryFileName,
      getCurrentDirectory: () => ".",
      getDirectories: () => [ "." ],
      getCanonicalFileName: (fileName) => fileName,
      getNewLine: () => "\n",
      readFile: (fileName) => fileName === sourceFileName ? source : fileName === libraryFileName ? libSource : null,
      writeFile: () => undefined,
      useCaseSensitiveFileNames: () => true,
      fileExists: (fileName) => fileName === sourceFileName || fileName === libraryFileName
    });
    return Compiler.compileProgram(program, options);
  }

  static compileProgram(program: ts.Program, options?: CompilerOptions): binaryen.Module | null {
    const compiler = new Compiler(program, options);

    // bail out if there were 'pre emit' errors
    let diagnostics = ts.getPreEmitDiagnostics(compiler.program);
    for (let i = 0, k = diagnostics.length; i < k; ++i) {
      printDiagnostic(diagnostics[i]);
      if (diagnostics[i].category === ts.DiagnosticCategory.Error)
        return null;
    }

    compiler.profiler.start("initialize");
    compiler.initialize();
    process.stderr.write("initialization took " + compiler.profiler.end("initialize").toFixed(3) + " ms\n");

    // bail out if there were initialization errors
    diagnostics = compiler.diagnostics.getDiagnostics();
    for (let i = 0, k = diagnostics.length; i < k; ++i)
      if (diagnostics[i].category === ts.DiagnosticCategory.Error)
        return null;

    compiler.profiler.start("compile");
    compiler.compile();
    process.stderr.write("compilation took " + compiler.profiler.end("compile").toFixed(3) + " ms\n");

    // bail out if there were compilation errors
    diagnostics = compiler.diagnostics.getDiagnostics();
    for (let i = 0, k = diagnostics.length; i < k; ++i)
      if (diagnostics[i].category === ts.DiagnosticCategory.Error)
        return null;

    return compiler.module;
  }

  constructor(program: ts.Program, options?: CompilerOptions) {
    if (!options)
      options = {};

    if (options.uintptrSize) {
      this.uintptrSize = options.uintptrSize | 0;
      if (this.uintptrSize !== 4 && this.uintptrSize !== 8)
        throw Error("unsupported uintptrSize");
    } else
      this.uintptrSize = defaultUintptrSize;

    this.noLib = !!options.noLib;
    this.program = program;
    this.checker = program.getDiagnosticsProducingTypeChecker();
    this.diagnostics = ts.createDiagnosticCollection();
    this.module = this.noLib ? new binaryen.Module() : binaryen.readBinary(mallocBuffer);
    this.uintptrType = this.uintptrSize === 4 ? uintptrType32 : uintptrType64;

    // the last non-declaration source file is assumed to be the entry file (TODO: does this work in all cases?)
    const sourceFiles = program.getSourceFiles();
    for (let i = sourceFiles.length - 1; i >= 0; --i) {
      if (sourceFiles[i].isDeclarationFile)
        continue;
      this.entryFile = sourceFiles[i];
      break;
    }
  }

  info(node: ts.Node, message: string, arg1?: string): void {
    const diagnostic = createDiagnosticForNode(node, ts.DiagnosticCategory.Message, message, arg1);
    this.diagnostics.add(diagnostic);
    printDiagnostic(diagnostic);
  }

  warn(node: ts.Node, message: string, arg1?: string): void {
    const diagnostic = createDiagnosticForNode(node, ts.DiagnosticCategory.Warning, message, arg1);
    this.diagnostics.add(diagnostic);
    printDiagnostic(diagnostic);
  }

  error(node: ts.Node, message: string, arg1?: string): void {
    const diagnostic = createDiagnosticForNode(node, ts.DiagnosticCategory.Error, message, arg1);
    this.diagnostics.add(diagnostic);
    printDiagnostic(diagnostic);
  }

  initialize(): void {
    const compiler = this;

    // TODO: it seem that binaryen.js doesn't support importing memory yet

    const sourceFiles = this.program.getSourceFiles();
    for (let i = 0, k = sourceFiles.length, file; i < k; ++i) {
      file = sourceFiles[i];

      this.currentPrefix = file === this.entryFile
        ? undefined
        : path.relative(path.dirname(this.entryFile.fileName), file.fileName).replace(/[^a-zA-Z0-9\.\/$]/g, "");

      for (let j = 0, l = file.statements.length, statement; j < l; ++j) {
        switch ((statement = file.statements[j]).kind) {

          case ts.SyntaxKind.ImportDeclaration:
          case ts.SyntaxKind.InterfaceDeclaration:
          case ts.SyntaxKind.TypeAliasDeclaration:
            continue; // already handled by TypeScript

          case ts.SyntaxKind.VariableStatement:
            compiler.initializeGlobal(<ts.VariableStatement>statement);
            continue;

          case ts.SyntaxKind.FunctionDeclaration:
            compiler.initializeFunction(<ts.FunctionDeclaration>statement);
            continue;

          case ts.SyntaxKind.ClassDeclaration:
            compiler.initializeClass(<ts.ClassDeclaration>statement);
            continue;

          case ts.SyntaxKind.EnumDeclaration:
            compiler.initializeEnum(<ts.EnumDeclaration>statement);
            continue;

          case ts.SyntaxKind.EndOfFileToken:
            continue;
        }
        throw Error("unsupported top-level node: " + ts.SyntaxKind[statement.kind]);
      }
    }

    if (this.noLib) // otherwise imported
      this.module.setMemory(1, MEM_MAX_32, "memory", []);
  }

  _initializeGlobal(name: string, type: wasm.Type, mutable: boolean, initializerNode?: ts.Expression): void {
    const op = this.module;

    if (this.currentPrefix)
      name = this.currentPrefix + "/" + name;

    if (!initializerNode) {
      op.addGlobal(name, binaryenTypeOf(type, this.uintptrSize), mutable);
      return;
    }

    if (initializerNode.kind === ts.SyntaxKind.FirstLiteralToken) {

      op.addGlobal(name, binaryenTypeOf(type, this.uintptrSize), mutable, ast.compileLiteral(this, <ts.LiteralExpression>initializerNode, type));
      this.globals[name] = new wasm.Global(name, type, mutable);

    } else {

      /* if (initializerNode.kind === ts.SyntaxKind.PropertyAccessExpression) {
        const value = this.checker.getConstantValue(<ts.PropertyAccessExpression>initializerNode);
        if (typeof value === 'number') {
          op.addGlobal(name, binaryenTypeOf(type, this.uintptrSize), mutable, ...);
        }
      } */

      if (!mutable) {

        this.error(initializerNode, "Unsupported global constant initializer");

      } else {

        op.addGlobal(name, binaryenTypeOf(type, this.uintptrSize), mutable, binaryenZeroOf(type, this.module, this.uintptrSize));
        this.globals[name] = new wasm.Global(name, type, mutable);

        this.globalInitializers.push(
          this.maybeConvertValue(
            initializerNode,
            this.compileExpression(initializerNode, type),
            getWasmType(initializerNode), type, false
          )
        );

      }

    }
  }

  initializeGlobal(node: ts.VariableStatement): void {
    for (let i = 0, k = node.declarationList.declarations.length; i < k; ++i) {
      const declaration = node.declarationList.declarations[i];
      const initializerNode = declaration.initializer;

      if (declaration.type && declaration.symbol) {
        const name = declaration.symbol.name;
        const type = this.resolveType(declaration.type);
        const mutable = !isConst(node.declarationList);

        if (type) {
          this._initializeGlobal(name, type, mutable, initializerNode);
        } else {
          this.error(declaration.type, "Unresolvable type");
        }
      } else {
        this.error(declaration.name, "Type expected");
      }
    }
  }

  private _initializeFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration, parent?: ts.ClassDeclaration): void {
    let name = (<ts.Symbol>node.symbol).name; // never undefined

    const isConstructor = node.kind === ts.SyntaxKind.Constructor;

    if (name === "memory" && isExport(node))
      this.error(node, "Duplicate exported name", "memory");

    const returnType: wasm.Type = isConstructor ? this.uintptrType : this.resolveType(<ts.TypeNode>node.type, true);

    if (node.typeParameters && node.typeParameters.length !== 0 && !node.getSourceFile().isDeclarationFile) // TODO: allowed in assembly.d.ts for now
      this.error(node.typeParameters[0], "Type parameters are not supported yet");

    let parameterTypes: wasm.Type[];
    let signatureIdentifiers: string[]; // including return type
    let binaryenSignatureTypes: binaryen.Type[]; // excluding return type
    let locals: wasm.Variable[];
    let index = 0;
    let flags = 0;

    if (parent && !isStatic(<ts.MethodDeclaration>node) && !isConstructor) { // add implicit 'this' as the first argument

      parameterTypes = new Array(node.parameters.length + 1);
      binaryenSignatureTypes = new Array(parameterTypes.length);
      signatureIdentifiers = new Array(parameterTypes.length + 1);
      locals = new Array(parameterTypes.length);

      const thisType = this.uintptrType; // TODO: underlyingType

      parameterTypes[0] = thisType;
      binaryenSignatureTypes[0] = binaryenTypeOf(thisType, this.uintptrSize);
      signatureIdentifiers[0] = signatureIdentifierOf(thisType, this.uintptrSize);
      locals[0] = new wasm.Variable("this", thisType, 0);

      flags |= wasm.FunctionFlags.instance;

      index = 1;

    } else {

      parameterTypes = new Array(node.parameters.length);
      signatureIdentifiers = new Array(parameterTypes.length + 1);
      binaryenSignatureTypes = new Array(parameterTypes.length);
      locals = new Array(parameterTypes.length);
      index = 0;
    }

    for (let i = 0, k = node.parameters.length; i < k; ++i) {
      const parameterName = (<ts.Symbol>node.parameters[i].symbol).name;
      const parameterType = this.resolveType(<ts.TypeNode>node.parameters[i].type);

      parameterTypes[index] = parameterType;
      binaryenSignatureTypes[index] = binaryenTypeOf(parameterType, this.uintptrSize);
      signatureIdentifiers[index] = signatureIdentifierOf(parameterType, this.uintptrSize);
      locals[index] = new wasm.Variable(parameterName, parameterType, index);

      ++index;
    }

    signatureIdentifiers[index] = signatureIdentifierOf(returnType, this.uintptrSize);

    const signatureIdentifier = signatureIdentifiers.join("");
    let signature = this.signatures[signatureIdentifier];
    if (!signature) {
      // TODO: binaryen -O does not handle now unused signatures after optimization
      const binaryenReturnType = binaryenTypeOf(returnType, this.uintptrSize);
      signature = this.module.getFunctionType(binaryenReturnType, binaryenSignatureTypes);
      if (!signature)
        signature = this.module.addFunctionType(signatureIdentifier, binaryenReturnType, binaryenSignatureTypes);
      this.signatures[signatureIdentifier] = signature;
    }

    if (isExport(node) && node.getSourceFile() === this.entryFile)
      flags |= wasm.FunctionFlags.export;

    if (isImport(node))
      flags |= wasm.FunctionFlags.import;

    let internalName = parent ? (<ts.Symbol>parent.symbol).name + "$" + name : name;
    if (this.currentPrefix)
      internalName = this.currentPrefix + "/" + internalName;

    const func = new wasm.Function(internalName, flags, parameterTypes, returnType);
    func.locals = locals;
    func.signature = signature;
    func.signatureIdentifier = signatureIdentifier;

    setWasmFunction(node, func);
  }

  initializeFunction(node: ts.FunctionDeclaration): void {
    this._initializeFunction(node);
  }

  initializeClass(node: ts.ClassDeclaration): void {

    if (node.typeParameters && node.typeParameters.length !== 0)
      this.error(node.typeParameters[0], "Type parameters are not supported yet");

    for (let i = 0, k = node.members.length; i < k; ++i) {
      const member = node.members[i];
      switch (member.kind) {

        case ts.SyntaxKind.PropertyDeclaration:
          break;

        case ts.SyntaxKind.Constructor:
          this._initializeFunction(<ts.ConstructorDeclaration>member, node);
          break;

        case ts.SyntaxKind.MethodDeclaration:
          if (isExport(member))
            this.error(member, "Class methods cannot be exports");

          if (isImport(member))
            this.error(member, "Class methods cannot be imports");

          this._initializeFunction(<ts.MethodDeclaration>member, node);
          break;

        default:
          this.error(member, "Unsupported class member", ts.SyntaxKind[member.kind]);

      }
    }
  }

  initializeEnum(node: ts.EnumDeclaration): void {
    const enumName = (<ts.Symbol>node.symbol).name;

    for (let i = 0, k = node.members.length; i < k; ++i) {
      let name = enumName + "$" + (<ts.Symbol>node.members[i].symbol).name;
      if (this.currentPrefix)
        name = this.currentPrefix + "/" + name;
      const value = this.checker.getConstantValue(node.members[i]);

      this.constants[name] = <wasm.Constant>{
        name: name,
        type: intType,
        value: value
      };
    }
  }

  compile(): void {

    const sourceFiles = this.program.getSourceFiles();
    for (let i = 0, k = sourceFiles.length; i < k; ++i) {

      if (sourceFiles[i].isDeclarationFile)
        continue;

      const statements = sourceFiles[i].statements;
      for (let j = 0, l = statements.length, statement; j < l; ++j) {
        switch ((statement = statements[j]).kind) {

          case ts.SyntaxKind.FunctionDeclaration:
            this.compileFunction(<ts.FunctionDeclaration>statement);
            break;

          case ts.SyntaxKind.ClassDeclaration:
            this.compileClass(<ts.ClassDeclaration>statement);
            break;

          // otherwise already handled or reported by initialize
        }
      }
    }

    this.maybeCompileStartFunction();
  }

  maybeCompileStartFunction(): void {
    if (this.globalInitializers.length === 0) {
      if (this.userStartFunction)
        this.module.setStart(this.userStartFunction);
      return;
    }

    const op = this.module;
    const body: binaryen.Statement[] = new Array(this.globalInitializers.length + (this.userStartFunction ? 1 : 0));

    let i = 0;
    for (const k = this.globalInitializers.length; i < k; ++i)
      body[i] = op.drop(this.globalInitializers[i]);
    if (this.userStartFunction)
      body[i] = op.call("start", [], binaryen.none);

    const startSignatureIdentifier = "v";
    let signature = this.signatures[startSignatureIdentifier];
    if (!signature) {i
      signature = this.signatures[startSignatureIdentifier] = this.module.getFunctionType(binaryen.none, []);
      if (!signature)
        signature = this.signatures[startSignatureIdentifier] = this.module.addFunctionType(startSignatureIdentifier, binaryen.none, []);
    }
    this.module.setStart(
      this.module.addFunction(this.userStartFunction ? "executeGlobalInitializersAndCallStart" : "executeGlobalInitalizers", signature, [], op.block("", body))
    );
  }

  private _compileFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration): binaryen.Function {
    if (!node.body)
      throw Error("missing body");

    const wasmFunction = getWasmFunction(node);
    const body: binaryen.Statement[] = new Array(node.body.statements.length);
    const additionalLocals: binaryen.Type[] = [];
    const compiler = this;

    this.currentFunction = wasmFunction;
    this.currentBreakContextNumber = 0;
    this.currentBreakContextDepth = 0;
    this.currentLocals = {};

    let bodyIndex = 0;
    let localIndex = 0;

    for (let i = 0, k = wasmFunction.locals.length; i < k; ++i) { // includes 'this'
      const local = wasmFunction.locals[i];
      this.currentLocals[local.name] = local;
      ++localIndex;
    }

    for (let i = 0, k = node.body.statements.length; i < k; ++i) {
      body[bodyIndex++] = compiler.compileStatement(node.body.statements[i], onVariable);
    }

    body.length = bodyIndex;

    /*function onVariable(variableNode: ts.VariableDeclaration): number {
      const originalName = variableNode.name.getText();
      const type = getWasmType(variableNode);*/
    function onVariable(originalName: string, type: wasm.Type) {

      let name = originalName;
      let alternative: number = 1;
      while (compiler.currentLocals[name])
        name = originalName + "." + alternative++;

      compiler.currentLocals[name] = new wasm.Variable(name, type, localIndex);
      additionalLocals.push(binaryenTypeOf(type, compiler.uintptrSize));

      return localIndex++;
    }

    return this.module.addFunction(wasmFunction.name, wasmFunction.signature, additionalLocals, this.module.block("", body));
  }

  compileFunction(node: ts.FunctionDeclaration): void {
    const wasmFunction = getWasmFunction(node);
    const name = (<ts.Symbol>node.symbol).name;

    if ((wasmFunction.flags & wasm.FunctionFlags.import) !== 0) {
      let moduleName: string;
      let baseName: string;

      const idx = name.indexOf("$");
      if (idx > 0) {
        moduleName = name.substring(0, idx);
        baseName = name.substring(idx + 1);
      } else {
        moduleName = "env";
        baseName = name;
      }

      this.module.addImport(name, moduleName, baseName, wasmFunction.signature);
      return;
    }

    const functionHandle = this._compileFunction(node);

    if ((wasmFunction.flags & wasm.FunctionFlags.export) !== 0)
      this.module.addExport(name, name);

    if (name === "start")
      if (wasmFunction.parameterTypes.length === 0 && wasmFunction.returnType === voidType)
        this.userStartFunction = functionHandle;
  }

  compileClass(node: ts.ClassDeclaration): void {
    for (let i = 0, k = node.members.length, member; i < k; ++i) {
      switch ((member = node.members[i]).kind) {

        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodDeclaration:
          this._compileFunction(<ts.MethodDeclaration | ts.ConstructorDeclaration>member);
          break;

        // otherwise already reported by initialize
      }
    }
  }

  enterBreakContext(): string {
    if (this.currentBreakContextDepth === 0)
      ++this.currentBreakContextNumber;
    ++this.currentBreakContextDepth;
    return this.currentBreakLabel;
  }

  leaveBreakContext(): void {
    if (this.currentBreakContextDepth < 1)
      throw Error("unbalanced break context");
    --this.currentBreakContextDepth;
  }

  get currentBreakLabel(): string {
    return this.currentBreakContextNumber + "." + this.currentBreakContextDepth;
  }

  compileStatement(node: ts.Statement, onVariable: (name: string, type: wasm.Type) => number): binaryen.Statement {
    const op = this.module;

    switch (node.kind) {

      case ts.SyntaxKind.TypeAliasDeclaration:
        return op.nop(); // already handled by TypeScript

      case ts.SyntaxKind.EmptyStatement:
        return ast.compileEmpty(this/*, <ts.EmptyStatement>node*/);

      case ts.SyntaxKind.VariableStatement:
        return ast.compileVariable(this, <ts.VariableStatement>node, onVariable);

      case ts.SyntaxKind.IfStatement:
        return ast.compileIf(this, <ts.IfStatement>node, onVariable);

      case ts.SyntaxKind.SwitchStatement:
        return ast.compileSwitch(this, <ts.SwitchStatement>node, onVariable);

      case ts.SyntaxKind.WhileStatement:
        return ast.compileWhile(this, <ts.WhileStatement>node, onVariable);

      case ts.SyntaxKind.DoStatement:
        return ast.compileDo(this, <ts.DoStatement>node, onVariable);

      case ts.SyntaxKind.ForStatement:
        return ast.compileFor(this, <ts.ForStatement>node, onVariable);

      case ts.SyntaxKind.Block:
        return ast.compileBlock(this, <ts.Block>node, onVariable);

      case ts.SyntaxKind.BreakStatement:
      case ts.SyntaxKind.ContinueStatement:
        return ast.compileBreak(this, <ts.BreakStatement | ts.ContinueStatement>node);

      case ts.SyntaxKind.ExpressionStatement:
        return ast.compileExpressionStatement(this, <ts.ExpressionStatement>node);

      case ts.SyntaxKind.ReturnStatement:
        return ast.compileReturn(this, <ts.ReturnStatement>node);

    }

    this.error(node, "Unsupported statement node", ts.SyntaxKind[node.kind]);
    return op.unreachable();
  }

  compileExpression(node: ts.Expression, contextualType: wasm.Type): binaryen.Expression {
    const op = this.module;

    switch (node.kind) {

      case ts.SyntaxKind.ParenthesizedExpression:
        return ast.compileParenthesized(this, <ts.ParenthesizedExpression>node, contextualType);

      case ts.SyntaxKind.AsExpression:
        return ast.compileAs(this, <ts.AsExpression>node, contextualType);

      case ts.SyntaxKind.BinaryExpression:
        return ast.compileBinary(this, <ts.BinaryExpression>node, contextualType);

      case ts.SyntaxKind.PrefixUnaryExpression:
        return ast.compilePrefixUnary(this, <ts.PrefixUnaryExpression>node, contextualType);

      case ts.SyntaxKind.PostfixUnaryExpression:
        return ast.compilePostfixUnary(this, <ts.PostfixUnaryExpression>node, contextualType);

      case ts.SyntaxKind.Identifier:
        return ast.compileIdentifier(this, <ts.Identifier>node, contextualType);

      case ts.SyntaxKind.PropertyAccessExpression:
        return ast.compilePropertyAccess(this, <ts.PropertyAccessExpression>node, contextualType);

      case ts.SyntaxKind.ConditionalExpression:
        return ast.compileConditional(this, <ts.ConditionalExpression>node, contextualType);

      case ts.SyntaxKind.CallExpression:
        return ast.compileCall(this, <ts.CallExpression>node, contextualType);

      case ts.SyntaxKind.FirstLiteralToken:
        return ast.compileLiteral(this, <ts.LiteralExpression>node, contextualType);

      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.FalseKeyword:

        setWasmType(node, boolType);
        return node.kind === ts.SyntaxKind.TrueKeyword
          ? binaryenOneOf(boolType, this.module, this.uintptrSize)
          : binaryenZeroOf(boolType, this.module, this.uintptrSize);

      case ts.SyntaxKind.NullKeyword:

        setWasmType(node, this.uintptrType);
        return binaryenZeroOf(this.uintptrType, this.module, this.uintptrSize);
    }

    this.error(node, "Unsupported expression node", ts.SyntaxKind[node.kind]);
    setWasmType(node, contextualType);
    return op.unreachable();
  }

  maybeConvertValue(node: ts.Expression, expr: binaryen.Expression, fromType: wasm.Type, toType: wasm.Type, explicit: boolean): binaryen.Expression {
    if (fromType.kind === toType.kind)
      return expr;

    const compiler = this;
    const op = this.module;

    function illegalImplicitConversion() {
      compiler.error(node, "Illegal implicit conversion", "'" + fromType + "' to '" + toType + "'");
      explicit = true; // report this only once for the topmost node
    }

    if (!explicit) {

      if (this.uintptrSize === 4 && fromType.kind === wasm.TypeKind.uintptr && toType.isInt)
        this.warn(node, "Implicit conversion from 'uintptr' to 'uint' will fail when targeting WASM64");

      if (this.uintptrSize === 8 && fromType.isLong && toType.kind === wasm.TypeKind.uintptr)
        this.warn(node, "Implicit conversion from 'ulong' to 'uintptr' will fail when targeting WASM32");
    }

    setWasmType(node, toType);

    if (fromType === floatType) {

      if (!explicit && toType !== doubleType)
        illegalImplicitConversion();

      switch (toType) {

        case byteType:
        case ushortType:
        case uintType:
        case uintptrType32:
        case boolType:
          return this.maybeConvertValue(node, op.i32.trunc_u.f32(expr), intType, toType, explicit);

        case sbyteType:
        case shortType:
        case intType:
          return this.maybeConvertValue(node, op.i32.trunc_s.f32(expr), intType, toType, explicit);

        case uintptrType64:
        case ulongType:
          return op.i64.trunc_u.f32(expr);

        case longType:
          return op.i64.trunc_s.f32(expr);

        // floatType == floatType

        case doubleType:
          return op.f64.promote(expr);

      }

    } else if (fromType === doubleType) {

      if (!explicit) illegalImplicitConversion();

      switch (toType) {

        case byteType:
        case ushortType:
        case uintType:
        case uintptrType32:
        case boolType:
          return this.maybeConvertValue(node, op.i32.trunc_u.f64(expr), intType, toType, explicit);

        case sbyteType:
        case shortType:
        case intType:
          return this.maybeConvertValue(node, op.i32.trunc_s.f64(expr), intType, toType, explicit);

        case ulongType:
        case uintptrType64:
          return op.i64.trunc_u.f64(expr);

        case longType:
          return op.i64.trunc_s.f64(expr);

        case floatType:
          return op.f32.demote(expr);

        // doubleType == doubleType

      }

    } else if (toType === floatType) { // int to float

      switch (fromType) {

        case uintType:
        case uintptrType32:
          if (!explicit) illegalImplicitConversion();

        case byteType:
        case ushortType:
        case boolType:
          return op.f32.convert_u.i32(expr);

        case intType:
          if (!explicit) illegalImplicitConversion();

        case sbyteType:
        case shortType:
          return op.f32.convert_s.i32(expr);

        case ulongType:
        case uintptrType64:
          if (!explicit) illegalImplicitConversion();
          return op.f32.convert_u.i64(expr);

        case longType:
          if (!explicit) illegalImplicitConversion();
          return op.f32.convert_s.i64(expr);

      }

    } else if (toType === doubleType) { // int to double

      switch (fromType) {

        case uintType:
        case uintptrType32:
        case byteType:
        case ushortType:
        case boolType:
          return op.f64.convert_u.i32(expr);

        case intType:
        case sbyteType:
        case shortType:
          return op.f64.convert_s.i32(expr);

        case ulongType:
        case uintptrType64:
          if (!explicit) illegalImplicitConversion();
          return op.f64.convert_u.i64(expr);

        case longType:
          if (!explicit) illegalImplicitConversion();
          return op.f64.convert_s.i64(expr);

      }

    } else if (fromType.isInt && toType.isLong) {

      if (toType.isSigned)
        return op.i64.extend_s(expr);
      else
        return op.i64.extend_u(expr);

    } else if (fromType.isLong && toType.isInt) {

      if (!explicit) illegalImplicitConversion();

      expr = op.i32.wrap(expr);
      fromType = fromType.isSigned ? intType : uintType;

      // fallthrough
    }

    // int to other int

    if (fromType.size < toType.size || toType.isInt)
      return expr;

    if (!explicit) illegalImplicitConversion();

    if (toType.isSigned) { // sign-extend

      return op.i32.shl(
        op.i32.shr_s(
          expr,
          op.i32.const(<number>toType.shift32)
        ),
        op.i32.const(<number>toType.shift32)
      );

    } else { // mask

      return op.i32.and(
        expr,
        op.i32.const(<number>toType.mask32)
      );

    }
  }

  maybeResolveAlias(symbol: ts.Symbol): ts.Symbol {

    // Exit early (before hitting 'number') if it's a built in type
    switch (symbol.name) {
      case "byte":
      case "sbyte":
      case "short":
      case "ushort":
      case "int":
      case "uint":
      case "long":
      case "ulong":
      case "bool":
      case "float":
      case "double":
      case "uintptr":
      case "Ptr":
        return symbol;
    }

    // Otherwise follow any aliases to the original type
    if (symbol.declarations)
      for (let i = 0, k = symbol.declarations.length; i < k; ++i) {
        const declaration = symbol.declarations[i];
        if (declaration.kind === ts.SyntaxKind.TypeAliasDeclaration) {
          const aliasDeclaration = <ts.TypeAliasDeclaration>declaration;
          if (aliasDeclaration.type.kind === ts.SyntaxKind.TypeReference) {
            const symbolAtLocation = this.checker.getSymbolAtLocation((<ts.TypeReferenceNode>aliasDeclaration.type).typeName);
            if (symbolAtLocation)
              return this.maybeResolveAlias(symbolAtLocation);
          }
        }
      }

    return symbol;
  }

  resolveType(type: ts.TypeNode, acceptVoid: boolean = false): wasm.Type {

    switch (type.kind) {

      case ts.SyntaxKind.ArrayType:
        return arrayTypeOf(this.resolveType((<ts.ArrayTypeNode>type).elementType), this.uintptrType);

      case ts.SyntaxKind.VoidKeyword:
        if (!acceptVoid)
          this.error(type, "Illegal type", "void");
        return voidType;

      case ts.SyntaxKind.TypeReference:
      {
        const referenceNode = <ts.TypeReferenceNode>type;
        const symbolAtLocation = this.checker.getSymbolAtLocation(referenceNode.typeName);
        if (symbolAtLocation) {
          const symbol = this.maybeResolveAlias(symbolAtLocation);
          if (symbol) {

            // Exit early if it's a basic type
            switch (symbol.name) {
              case "byte": return byteType;
              case "sbyte": return sbyteType;
              case "short": return shortType;
              case "ushort": return ushortType;
              case "int": return intType;
              case "uint": return uintType;
              case "long": return longType;
              case "ulong": return ulongType;
              case "bool": return boolType;
              case "float": return floatType;
              case "double": return doubleType;
              case "uintptr": return this.uintptrType;
            }

            // TODO
            // if (referenceName === "Ptr" && referenceNode.typeArguments.length === 1 && referenceNode.typeArguments[0].kind !== ts.SyntaxKind.TypeReference)
            //   return this.uintptrType.withUnderlyingType(this.resolveType(<ts.TypeReferenceNode>referenceNode.typeArguments[0]));
          }
        }
      }
    }

    this.error(type, "Unsupported type", type.getText());
    return voidType;
  }

  resolveIdentifier(name: string): wasm.Variable | wasm.Global | wasm.Constant | null {

    const referencedLocal = this.currentLocals[name];
    if (referencedLocal)
      return referencedLocal;

    const referencedGlobal = this.globals[name];
    if (referencedGlobal)
      return referencedGlobal;

    const referencedConstant = this.constants[name];
    if (referencedConstant)
      return referencedConstant;

    return null;
  }
}
