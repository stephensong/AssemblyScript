import "byots";
import * as Long from "long";
import * as builtins from "./builtins";
import * as wasm from "./wasm";
import * as ast from "./ast";
import { binaryen } from "./wasm";
import { Profiler } from "./profiler";
import { createDiagnosticForNode, printDiagnostic } from "./diagnostics";
import { byteType, sbyteType, shortType, ushortType, intType, uintType, longType, ulongType, boolType, floatType, doubleType, uintptrType32, uintptrType64, voidType } from "./types";
import { isImport, isExport, isConst, isStatic } from "./util";

const MEM_MAX_32 = (1 << 16) - 1; // 65535 (pageSize) * 65535 (n) ^= 4GB

// Rule #1: This is a compiler, not an optimizer. Makes life a lot easier.

export class Compiler {
  program: ts.Program;
  checker: ts.TypeChecker;
  entryFile: ts.SourceFile;
  diagnostics: ts.DiagnosticCollection;
  uintptrSize: number;
  uintptrType: wasm.Type;
  module: binaryen.Module;
  signatures: { [key: string]: binaryen.Signature } = {};
  constants: { [key: string]: wasm.Constant } = {};
  globalInitializers: binaryen.Expression[] = [];
  profiler = new Profiler();
  currentFunction: wasm.Function;
  currentLocals: { [key: string]: wasm.Variable };
  currentBreakContextNumber = 0;
  currentBreakContextDepth = 0;

  static compile(filename: string): binaryen.Module {

    const program = ts.createProgram([ __dirname + "/../assembly.d.ts", filename ], {
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.None,
      noLib: true,
      experimentalDecorators: true,
      types: []
    });

    const compiler = new Compiler(program);

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

  constructor(program: ts.Program, uintptrSize = 4) {
    if (uintptrSize !== 4 && uintptrSize !== 8)
      throw Error("unsupported uintptrSize");

    this.program = program;
    this.checker = program.getDiagnosticsProducingTypeChecker();
    this.diagnostics = ts.createDiagnosticCollection();
    this.module = new binaryen.Module();
    this.uintptrSize = uintptrSize;
    this.uintptrType = uintptrSize === 4 ? uintptrType32 : uintptrType64;

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
    this.module.setMemory(256, MEM_MAX_32, "memory", []);

    const sourceFiles = this.program.getSourceFiles();
    for (let i = 0, k = sourceFiles.length, file; i < k; ++i) {
      file = sourceFiles[i];

      for (let j = 0, l = file.statements.length, statement; j < l; ++j) {
        switch ((statement = file.statements[j]).kind) {

          case ts.SyntaxKind.ImportDeclaration: // already handled
            continue;

          case ts.SyntaxKind.TypeAliasDeclaration: // TODO: allowed in assembly.d.ts for now
          case ts.SyntaxKind.InterfaceDeclaration: //
            if (file.isDeclarationFile)
              continue;
            else
              break;

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
  }

  initializeGlobal(node: ts.VariableStatement): void {

    // TODO: it seems that binaryen.js does not support globals, yet

    for (let i = 0, k = node.declarationList.declarations.length; i < k; ++i) {
      const declaration = node.declarationList.declarations[i];
      const initializerNode = declaration.initializer;

      if (declaration.type) {
        const type = this.resolveType(declaration.type);
        if (type) {

          if (isConst(node.declarationList)) {

            switch (initializerNode.kind) {
              case ts.SyntaxKind.FirstLiteralToken:
                // TODO
                break;
            }

          } else {
            this.globalInitializers.push(
              this.maybeConvertValue(
                initializerNode,
                this.compileExpression(initializerNode, type),
                (<any>initializerNode).wasmType, type, false
              )
            );

            // at this point we'd have a dynamic initializer but no place to put it.
            // so, what about 'start' instead of enforcing constant initializers?
          }

          this.error(node, "Global variables are not supported yet");

        } else {
          this.error(declaration.type, "Unresolvable type");
        }
      } else {
        this.error(declaration, "Global variable declaration requires a type");
      }
    }
  }

  private _initializeFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration, parent?: ts.ClassDeclaration): void {
    const name = node.symbol.name;
    const returnType = this.resolveType(<ts.TypeNode>node.type, true);

    if (node.typeParameters && node.typeParameters.length !== 0 && !node.getSourceFile().isDeclarationFile) // TODO: allowed in assembly.d.ts for now
      this.error(node.typeParameters[0], "Type parameters are not supported yet");

    let parameterTypes: wasm.Type[];
    let signatureIdentifiers: string[]; // including return type
    let signatureTypes: binaryen.Type[]; // excluding return type
    let locals: wasm.Variable[];
    let index = 0;
    let flags = 0;

    if (parent && !isStatic(<ts.MethodDeclaration>node)) { // add implicit 'this' as the first argument

      parameterTypes = new Array(node.parameters.length + 1);
      signatureTypes = new Array(parameterTypes.length);
      signatureIdentifiers = new Array(parameterTypes.length + 1);
      locals = new Array(parameterTypes.length);

      const thisType = this.uintptrType; // TODO: underlyingType

      parameterTypes[0] = thisType;
      signatureTypes[0] = thisType.toBinaryenType(this.uintptrType);
      signatureIdentifiers[0] = thisType.toSignatureIdentifier(this.uintptrType);
      locals[0] = {
        name: "this",
        index: 0,
        type: thisType
      };

      flags |= wasm.FunctionFlags.instance;

      index = 1;

    } else {

      parameterTypes = new Array(node.parameters.length);
      signatureIdentifiers = new Array(parameterTypes.length + 1);
      signatureTypes = new Array(parameterTypes.length);
      locals = new Array(parameterTypes.length);
      index = 0;
    }

    for (let i = 0, k = node.parameters.length; i < k; ++i) {
      const parameterName = node.parameters[i].symbol.name;
      const parameterType = this.resolveType(<ts.TypeNode>node.parameters[i].type);

      parameterTypes[index] = parameterType;
      signatureTypes[index] = parameterType.toBinaryenType(this.uintptrType);
      signatureIdentifiers[index] = parameterType.toSignatureIdentifier(this.uintptrType);
      locals[index] = {
        name: parameterName,
        index: index,
        type: parameterType
      };

      ++index;
    }

    signatureIdentifiers[index] = returnType.toSignatureIdentifier(this.uintptrType);

    const signatureId = signatureIdentifiers.join("");
    let signature = this.signatures[signatureId];
    if (!signature) {
      signature = this.module.addFunctionType(signatureId, returnType.toBinaryenType(this.uintptrType), signatureTypes);
      this.signatures[signatureId] = signature;
    }

    if (isExport(node) && node.getSourceFile() === this.entryFile)
      flags |= wasm.FunctionFlags.export;

    if (isImport(node))
      flags |= wasm.FunctionFlags.import;

    (<any>node).wasmFunction = <wasm.Function>{
      name: parent ? parent.symbol.name + "$" + name : name,
      flags: flags,
      parameterTypes: parameterTypes,
      returnType: returnType,
      locals: locals,
      signature: signature,
      signatureId: signatureId
    };
  }

  initializeFunction(node: ts.FunctionDeclaration): void {
    this._initializeFunction(node);
  }

  initializeClass(node: ts.ClassDeclaration): void {
    const name = node.symbol.name;

    if (node.typeParameters && node.typeParameters.length !== 0)
      this.error(node.typeParameters[0], "Type parameters are not supported yet");

    for (let i = 0, k = node.members.length; i < k; ++i) {
      const member = node.members[i];
      switch (member.kind) {

        case ts.SyntaxKind.MethodDeclaration:
          if (isExport(member))
            this.error(member, "Class methods cannot be exports");

          if (isImport(member))
            this.error(member, "Class methods cannot be imports");

          this._initializeFunction(<ts.MethodDeclaration>member, node);
          break;

        default:
          this.error(member, "Unsupported class member", ts.SyntaxKind[node.kind]);

      }
    }
  }

  initializeEnum(node: ts.EnumDeclaration): void {
    const enumName = node.symbol.name;

    for (let i = 0, k = node.members.length, member; i < k; ++i) {
      const name = enumName + "$" + node.members[i].symbol.name;
      const value = this.checker.getConstantValue(member);

      this.constants[name] = {
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

          case ts.SyntaxKind.VariableStatement:
            this.compileVariable(<ts.VariableStatement>statement);
            break;

          case ts.SyntaxKind.FunctionDeclaration:
            this.compileFunction(<ts.FunctionDeclaration>statement);
            break;

          case ts.SyntaxKind.ClassDeclaration:
            this.compileClass(<ts.ClassDeclaration>statement);
            break;

          // otherwise already reported by initialize
        }
      }
    }
  }

  compileVariable(node: ts.VariableStatement): void {
    // TODO
  }

  private _compileFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration): binaryen.Function {
    const wasmFunction: wasm.Function = (<any>node).wasmFunction;
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
      const stmt = compiler.compileStatement(node.body.statements[i], onVariable);
      if (stmt !== null)
        body[bodyIndex++] = stmt;
    }

    body.length = bodyIndex;

    function onVariable(variableNode: ts.VariableDeclaration): number {
      const name = variableNode.name.getText();
      const type = <wasm.Type>(<any>variableNode).wasmType;

      if (compiler.currentLocals[name]) {

        compiler.error(variableNode, "Local variable shadows another variable of the same name in a parent scope", name);

      } else {

        compiler.currentLocals[name] = {
          name: name,
          index: localIndex,
          type: type
        };
      }

      additionalLocals.push(type.toBinaryenType(this.uintptrType));

      return localIndex++;
    }

    return this.module.addFunction(wasmFunction.name, wasmFunction.signature, additionalLocals, this.module.block("", body));
  }

  compileFunction(node: ts.FunctionDeclaration): void {
    const wasmFunction = <wasm.Function>(<any>node).wasmFunction;
    const name = node.symbol.name;

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

    if ((node.modifierFlagsCache & ts.ModifierFlags.Export) !== 0)
      this.module.addExport(name, name);

    if (name === "start") {
      if (wasmFunction.parameterTypes.length === 0 && wasmFunction.returnType === voidType)
        this.module.setStart(functionHandle);
      // else - TODO: should this emit a warning?
    }
  }

  compileClass(node: ts.ClassDeclaration): void {
    for (let i = 0, k = node.members.length, member; i < k; ++i) {
      switch ((member = node.members[i]).kind) {

        case ts.SyntaxKind.MethodDeclaration:
          this._compileFunction(<ts.MethodDeclaration>member);
          break;

        // otherwise already reported by initialize
      }
    }
  }

  enterBreakContext(): void {
    if (this.currentBreakContextDepth === 0)
      ++this.currentBreakContextNumber;
    ++this.currentBreakContextDepth;
  }

  leaveBreakContext(): void {
    if (this.currentBreakContextDepth < 1)
      throw Error("unbalanced break context");
    --this.currentBreakContextDepth;
  }

  get currentBreakLabel(): string {
    return this.currentBreakContextNumber + "." + this.currentBreakContextDepth;
  }

  compileStatement(node: ts.Statement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
    const op = this.module;

    switch (node.kind) {

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

      case ts.SyntaxKind.Block:
        return ast.compileBlock(this, <ts.Block>node, onVariable);

      case ts.SyntaxKind.BreakStatement:
      case ts.SyntaxKind.ContinueStatement:
        return ast.compileBreak(this, node.kind === ts.SyntaxKind.ContinueStatement);

      case ts.SyntaxKind.ExpressionStatement:
        return ast.compileExpressionStatement(this, <ts.ExpressionStatement>node);

      case ts.SyntaxKind.ReturnStatement:
        return ast.compileReturn(this, <ts.ReturnStatement>node);

      default:
        this.error(node, "Unsupported statement node", ts.SyntaxKind[node.kind]);
    }
  }

  categoryOf(type: wasm.Type): binaryen.I32Operations | binaryen.I64Operations | binaryen.F32Operations | binaryen.F64Operations {
    return type.toBinaryenCategory(this.module, this.uintptrType);
  }

  zeroOf(type: wasm.Type): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
    return type.toBinaryenZero(this.module, this.uintptrType);
  }

  oneOf(type: wasm.Type): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
    return type.toBinaryenOne(this.module, this.uintptrType);
  }

  compileLiteral(node: ts.LiteralExpression, contextualType: wasm.Type): binaryen.Expression {
    const op = this.module;

    let literalText = node.text;

    switch (literalText) {

      case "true":
        (<any>node).wasmType = boolType;
        return contextualType.isLong ? op.i64.const(1, 0) : op.i32.const(1);

      case "false":
        (<any>node).wasmType = boolType;
        return contextualType.isLong ? op.i64.const(0, 0) : op.i32.const(0);

      case "null":
        (<any>node).wasmType = this.uintptrType;
        return this.uintptrSize === 4 ? op.i32.const(0) : op.i64.const(0, 0);

    }

    if (contextualType.isAnyFloat) {

      let floatValue: number;

      if (/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/.test(literalText)) {
        floatValue = parseFloat(literalText);
      } else {
        floatValue = 0;
        this.error(node, "Float literal expected", literalText);
      }

      (<any>node).wasmType = contextualType;
      return contextualType === floatType ? op.f32.const(floatValue) : op.f64.const(floatValue);

    } else if (contextualType.isAnyInteger) {

      let intValue: number;
      let intRadix: number;

      if (/^(?:0|[1-9][0-9]*)$/.test(literalText)) {
        intValue = parseInt(literalText, intRadix = 10);
      } else if (/^0[xX][0-9A-Fa-f]+$/.test(literalText)) {
        intValue = parseInt(literalText = literalText.substring(2), intRadix = 16);
      } else {
        intValue = 0; intRadix = 10; literalText = "0";
        this.error(node, "Integer literal expected", literalText);
      }

      (<any>node).wasmType = contextualType;

      switch (contextualType) {

        case sbyteType:
        case shortType:
          return op.i32.const(((intValue >>> 0) << contextualType.shift32) >> contextualType.shift32);

        case byteType:
        case ushortType:
          return op.i32.const(intValue & contextualType.mask32);

        case intType:
        case uintType:
        case uintptrType32:
          return op.i32.const(intValue);

        case boolType:
          return op.i32.const(intValue ? 1 : 0);

        case longType:
        case ulongType:
        case uintptrType64:
          const long = Long.fromString(literalText, !contextualType.isSigned, intRadix);
          return op.i64.const(long.low, long.high);

      }

    }

    this.error(node, "Unsupported literal", literalText);

    (<any>node).wasmType = contextualType;
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
        return this.compileLiteral(<ts.LiteralExpression>node, contextualType);

      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.FalseKeyword:

        (<any>node).wasmType = boolType;
        return node.kind === ts.SyntaxKind.TrueKeyword
          ? this.oneOf(boolType)
          : this.zeroOf(boolType);

      case ts.SyntaxKind.NullKeyword:

        (<any>node).wasmType = this.uintptrType;
        return this.zeroOf(this.uintptrType);
    }

    this.error(node, "Unsupported expression node", ts.SyntaxKind[node.kind]);
    (<any>node).wasmType = contextualType;
    return op.unreachable();
  }

  maybeConvertValue(node: ts.Node, expr: binaryen.Expression, fromType: wasm.Type, toType: wasm.Type, explicit: boolean): binaryen.Expression {
    if (fromType.kind === toType.kind)
      return expr;

    const compiler = this;
    const op = this.module;

    function illegalImplicitConversion() {
      compiler.error(node, "Cannot convert from '" + fromType + "' to '" + toType + "' without a cast");
      explicit = true; // report this only once for the topmost node
    }

    (<any>node).wasmType = toType;

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

        case ulongType:
        case uintptrType64:
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
          op.i32.const(toType.shift32)
        ),
        op.i32.const(toType.shift32)
      );

    } else { // mask

      return op.i32.and(
        expr,
        op.i32.const(toType.mask32)
      );

    }
  }

  resolveType(type: ts.TypeNode, acceptVoid: boolean = false): wasm.Type {
    const text = type.getText();

    switch (text) {
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
      case "void": if (acceptVoid) return voidType;
    }

    if (type.kind === ts.SyntaxKind.TypeReference) {
      const referenceNode = <ts.TypeReferenceNode>type;
      const referenceName = referenceNode.typeName.getText();

      if (referenceName === "Ptr" && referenceNode.typeArguments.length === 1 && referenceNode.typeArguments[0].kind !== ts.SyntaxKind.TypeReference)
        return this.uintptrType.withUnderlyingType(this.resolveType(<ts.TypeReferenceNode>referenceNode.typeArguments[0]));
    }

    this.error(type, "Unsupported type", text);
    return voidType;
  }
}
