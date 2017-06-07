import * as base64 from "@protobufjs/base64";
import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import * as expressions from "./expressions";
import * as library from "./library";
import * as path from "path";
import Profiler from "./profiler";
import * as reflection from "./reflection";
import * as statements from "./statements";
import * as typescript from "./typescript";

// TypeScript compiler options for AssemblyScript compilation.
const tscOptions = <typescript.CompilerOptions>{
  target: typescript.ScriptTarget.Latest,
  module: typescript.ModuleKind.None,
  noLib: true,
  experimentalDecorators: true,
  types: []
};

// Malloc, free, etc. is present as a base64 encoded blob and prepared once when required.
let mallocWasm: Uint8Array;

/** AssemblyScript compiler options. */
export interface CompilerOptions {

  /** Specifies the byte size of a pointer. WASM32 uses `4`, WASM64 uses `8`. */
  uintptrSize?: number;

  /** Specifies whether the standard library (malloc, free, etc.) shall be excluded. */
  noLib?: boolean;

  /** Specifies that compilation shall be performed in silent mode without writing to stderr. */
  silent?: boolean;
}

/** AssemblyScript compiler. */
export class Compiler {
  options: CompilerOptions;

  // TypeScript-related
  program: typescript.Program;
  checker: typescript.TypeChecker;
  entryFile: typescript.SourceFile;
  libraryFile: typescript.SourceFile;
  diagnostics: typescript.DiagnosticCollection;

  // Binaryen-related
  module: binaryen.Module;
  signatures: { [key: string]: binaryen.Signature } = {};
  globalInitializers: binaryen.Expression[] = [];
  userStartFunction?: binaryen.Function;

  // Codegen
  profiler = new Profiler();
  currentFunction: reflection.Function;

  // Reflection
  uintptrType: reflection.Type;
  functionTemplates: { [key: string]: reflection.FunctionTemplate } = {};
  classTemplates: { [key: string]: reflection.ClassTemplate } = {};
  globals: { [key: string]: reflection.Variable } = {};
  functions: { [key: string]: reflection.Function } = {};
  classes: { [key: string]: reflection.Class } = {};
  enums: { [key: string]: reflection.Enum } = {};

  /**
   * Compiles an AssemblyScript file to WebAssembly.
   * @param filename Entry file name
   * @param options Compiler options
   * @returns Compiled module or `null` if compilation failed. In case of failure, diagnostics are stored in {@link Compiler#diagnostics}.
   */
  static compileFile(filename: string, options?: CompilerOptions): binaryen.Module | null {
    return Compiler.compileProgram(
      typescript.createProgram([ __dirname + "/../assembly.d.ts", filename ], tscOptions),
      options
    );
  }

  /**
   * Compiles an AssemblyScript string to WebAssembly.
   * @param source Source string
   * @param options Compiler options
   * @returns Compiled module or `null` if compilation failed. In case of failure, diagnostics are stored in {@link Compiler#diagnostics}.
   */
  static compileString(source: string, options?: CompilerOptions): binaryen.Module | null {
    const sourceFileName = "module.ts";
    const sourceFile = typescript.createSourceFile(sourceFileName, source, typescript.ScriptTarget.Latest);
    const libraryFileName = "assembly.d.ts";
    const libraryFile = typescript.createSourceFile(libraryFileName, library.libSource, typescript.ScriptTarget.Latest);

    const program = typescript.createProgram([ libraryFileName, sourceFileName ], tscOptions, <typescript.CompilerHost>{
      getSourceFile: (fileName) => fileName === sourceFileName ? sourceFile : fileName === libraryFileName ? libraryFile : undefined,
      getDefaultLibFileName: () => libraryFileName,
      getCurrentDirectory: () => ".",
      getDirectories: () => [ "." ],
      getCanonicalFileName: (fileName) => fileName,
      getNewLine: () => "\n",
      readFile: (fileName) => fileName === sourceFileName ? source : fileName === libraryFileName ? library.libSource : null,
      writeFile: () => undefined,
      useCaseSensitiveFileNames: () => true,
      fileExists: (fileName) => fileName === sourceFileName || fileName === libraryFileName
    });
    return Compiler.compileProgram(program, options);
  }

  /**
   * Compiles a TypeScript program using AssemblyScript syntax to WebAssembly.
   * @param program TypeScript program
   * @param options Compiler options
   * @returns Compiled module or `null` if compilation failed. In case of failure, diagnostics are stored in {@link Compiler#diagnostics}.
   */
  static compileProgram(program: typescript.Program, options?: CompilerOptions): binaryen.Module | null {
    const compiler = new Compiler(program, options);
    const silent = !!(options && options.silent);

    // bail out if there were 'pre emit' errors
    let diagnostics = typescript.getPreEmitDiagnostics(compiler.program);
    for (let i = 0, k = diagnostics.length; i < k; ++i) {
      typescript.printDiagnostic(diagnostics[i]);
      if (diagnostics[i].category === typescript.DiagnosticCategory.Error)
        return null;
    }

    if (!silent)
      compiler.profiler.start("initialize");
    compiler.initialize();
    if (!silent)
      process.stderr.write("initialization took " + compiler.profiler.end("initialize").toFixed(3) + " ms\n");

    // bail out if there were initialization errors
    diagnostics = compiler.diagnostics.getDiagnostics();
    for (let i = 0, k = diagnostics.length; i < k; ++i)
      if (diagnostics[i].category === typescript.DiagnosticCategory.Error)
        return null;

    if (!silent)
      compiler.profiler.start("compile");
    compiler.compile();
    if (!silent)
      process.stderr.write("compilation took " + compiler.profiler.end("compile").toFixed(3) + " ms\n");

    // bail out if there were compilation errors
    diagnostics = compiler.diagnostics.getDiagnostics();
    for (let i = 0, k = diagnostics.length; i < k; ++i)
      if (diagnostics[i].category === typescript.DiagnosticCategory.Error)
        return null;

    return compiler.module;
  }

  /** Gets the configured byte size of a pointer. */
  get uintptrSize(): number { return this.options.uintptrSize || 4; }

  /**
   * Constructs a new AssemblyScript compiler.
   * @param program TypeScript program
   * @param options Compiler options
   */
  constructor(program: typescript.Program, options?: CompilerOptions) {
    this.options = options || {};

    if (this.options.uintptrSize && this.options.uintptrSize !== 4 && this.options.uintptrSize !== 8)
      throw Error("unsupported uintptrSize");

    this.program = program;
    this.checker = program.getDiagnosticsProducingTypeChecker();
    this.diagnostics = typescript.createDiagnosticCollection();

    if (!this.options.noLib && !mallocWasm) {
      mallocWasm = new Uint8Array(base64.length(library.mallocBlob));
      base64.decode(library.mallocBlob, mallocWasm, 0);
    }

    this.module = this.options.noLib ? new binaryen.Module() : binaryen.readBinary(mallocWasm);
    this.uintptrType = this.uintptrSize === 4 ? reflection.uintptrType32 : reflection.uintptrType64;

    const sourceFiles = program.getSourceFiles();
    for (let i = sourceFiles.length - 1; i >= 0; --i) {

      // the first declaration file is assumed to be the library file
      if (sourceFiles[i].isDeclarationFile)
          this.libraryFile = sourceFiles[i];

      // the last non-declaration file is assumed to be the entry file
      else if (!this.entryFile)
        this.entryFile = sourceFiles[i];
    }
  }

  /** Adds an informative diagnostic to {@link Compiler#diagnostics} and prints it. */
  info(node: typescript.Node, message: string, arg1?: string): void {
    const diagnostic = typescript.createDiagnosticForNodeEx(node, typescript.DiagnosticCategory.Message, message, arg1);
    this.diagnostics.add(diagnostic);
    if (!(this.options && this.options.silent))
      typescript.printDiagnostic(diagnostic);
  }

  /** Adds a warning diagnostic to {@link Compiler#diagnostics} and prints it. */
  warn(node: typescript.Node, message: string, arg1?: string): void {
    const diagnostic = typescript.createDiagnosticForNodeEx(node, typescript.DiagnosticCategory.Warning, message, arg1);
    this.diagnostics.add(diagnostic);
    if (!(this.options && this.options.silent))
      typescript.printDiagnostic(diagnostic);
  }

  /** Adds an error diagnostic to {@link Compiler#diagnostics} and prints it. */
  error(node: typescript.Node, message: string, arg1?: string): void {
    const diagnostic = typescript.createDiagnosticForNodeEx(node, typescript.DiagnosticCategory.Error, message, arg1);
    this.diagnostics.add(diagnostic);
    if (!(this.options && this.options.silent))
      typescript.printDiagnostic(diagnostic);
  }

  /** Mangles a global name (of a function, a class, ...) for use with binaryen. */
  mangleGlobalName(name: string, sourceFile: typescript.SourceFile) {
    // prepends the relative path to imported files
    if (sourceFile !== this.entryFile && sourceFile !== this.libraryFile) {
      name = path.relative(
        path.dirname(path.normalize(this.entryFile.fileName)),
        path.normalize(sourceFile.fileName)
      ).replace(/[^a-zA-Z0-9\.\/\\$]/g, "") + path.sep + name;
    }
    return name;
  }

  /** Scans over the sources and initializes the reflection structure. */
  initialize(): void {
    const sourceFiles = this.program.getSourceFiles();

    for (let i = 0, k = sourceFiles.length, file; i < k; ++i) {
      file = sourceFiles[i];

      for (let j = 0, l = file.statements.length, statement; j < l; ++j) {
        switch ((statement = file.statements[j]).kind) {

          case typescript.SyntaxKind.EndOfFileToken:
          case typescript.SyntaxKind.InterfaceDeclaration:
          case typescript.SyntaxKind.TypeAliasDeclaration:
          case typescript.SyntaxKind.ImportDeclaration:
            break; // already handled by TypeScript

          case typescript.SyntaxKind.VariableStatement:
            this.initializeGlobal(<typescript.VariableStatement>statement);
            break;

          case typescript.SyntaxKind.FunctionDeclaration:
            this.initializeFunction(<typescript.FunctionDeclaration>statement);
            break;

          case typescript.SyntaxKind.ClassDeclaration:
            this.initializeClass(<typescript.ClassDeclaration>statement);
            break;

          case typescript.SyntaxKind.EnumDeclaration:
            this.initializeEnum(<typescript.EnumDeclaration>statement);
            break;

          default:
            this.error(statement, "Unsupported top-level statement", typescript.SyntaxKind[statement.kind]);
            break;
        }
      }
    }

    if (this.options.noLib) {
      // setup empty memory
      this.module.setMemory(1, 0xffff, "memory", []);
    } else {
      // memory is imported
      this.initializeLibrary();
    }
  }

  initializeLibrary(): void {
    const op = this.module;
    const binaryenPtrType = binaryen.typeOf(this.uintptrType, this.uintptrSize);

    // initialize mspace'd malloc on start and remember the mspace within `.msp`:
    op.addGlobal(".msp", binaryenPtrType, true, binaryen.valueOf(this.uintptrType, this.module, 0));
    this.globalInitializers.push(
      op.setGlobal(".msp", op.call("mspace_init", [
        binaryen.valueOf(this.uintptrType, this.module, this.uintptrSize * 2) // TODO: change to actual heap start offset
      ], binaryenPtrType))
    );

    // now, instead of exposing mspace'd functions ...
    this.module.removeExport("mspace_init");
    this.module.removeExport("mspace_malloc");
    this.module.removeExport("mspace_free");

    // ... wrap each in a non-mspace'd version ...
    const mallocSignatureIdentifier = this.uintptrSize === 4 ? "ii" : "II";
    let mallocSignature = this.signatures[mallocSignatureIdentifier];
    if (!mallocSignature)
      mallocSignature = this.signatures[mallocSignatureIdentifier] = this.module.getFunctionType(binaryenPtrType, [ binaryenPtrType ]) || this.module.addFunctionType(mallocSignatureIdentifier, binaryenPtrType, [ binaryenPtrType ]);
    this.module.addFunction("malloc", mallocSignature, [], op.block("", [
      op.return(
        op.call("mspace_malloc", [ op.getGlobal(".msp", binaryenPtrType), op.getLocal(0, binaryenPtrType) ], binaryenPtrType)
      )
    ]));
    const freeSignatureIdentifier = this.uintptrSize === 4 ? "iv" : "Iv";
    let freeSignature = this.signatures[freeSignatureIdentifier];
    if (!freeSignature)
      freeSignature = this.signatures[freeSignatureIdentifier] = this.module.getFunctionType(binaryen.none, [ binaryenPtrType ]) || this.module.addFunctionType(freeSignatureIdentifier, binaryen.none, [ binaryenPtrType ]);
    this.module.addFunction("free", freeSignature, [], op.block("", [
      op.call("mspace_free", [ op.getGlobal(".msp", binaryenPtrType), op.getLocal(0, binaryenPtrType) ], binaryen.none)
    ]));

    // ... and expose these to the outside for convenience:
    this.module.addExport("malloc", "malloc");
    this.module.addExport("free", "free");
  }

  initializeGlobal(node: typescript.VariableStatement): void {
    for (let i = 0, k = node.declarationList.declarations.length; i < k; ++i) {
      const declaration = node.declarationList.declarations[i];
      const initializerNode = declaration.initializer;

      if (declaration.type && declaration.symbol) {
        const name = this.mangleGlobalName(declaration.symbol.name, declaration.getSourceFile());
        const type = this.resolveType(declaration.type);

        if (type)
          this.addGlobal(name, type, !typescript.isConst(node.declarationList), initializerNode);
        else
          this.error(declaration.type, "Unresolvable type");

      } else
        this.error(declaration.name, "Type expected");
    }
  }

  addGlobal(name: string, type: reflection.Type, mutable: boolean, initializerNode?: typescript.Expression): void {
    const op = this.module;
    let flags: reflection.VariableFlags = reflection.VariableFlags.global;
    if (!mutable)
      flags |= reflection.VariableFlags.constant;

    this.globals[name] = new reflection.Variable(name, type, flags, 0, 0);

    if (initializerNode) {

      if (initializerNode.kind === typescript.SyntaxKind.NumericLiteral) {
        op.addGlobal(name, binaryen.typeOf(type, this.uintptrSize), mutable, expressions.compileLiteral(this, <typescript.LiteralExpression>initializerNode, type));

      } else if (mutable) {
        op.addGlobal(name, binaryen.typeOf(type, this.uintptrSize), mutable, binaryen.valueOf(type, this.module, 0));

        this.globalInitializers.push(
          op.setGlobal(name,
            this.maybeConvertValue(
              initializerNode,
              this.compileExpression(initializerNode, type),
              typescript.getReflectedType(initializerNode), type, false
            )
          )
        );
      } else
        this.error(initializerNode, "Unsupported global constant initializer");

    } else
      op.addGlobal(name, binaryen.typeOf(type, this.uintptrSize), mutable, binaryen.valueOf(type, this.module, 0));
  }

  initializeFunction(node: typescript.FunctionLikeDeclaration): void {
    let name: string;
    if (node.kind === typescript.SyntaxKind.FunctionDeclaration) {
      name = this.mangleGlobalName((<typescript.Identifier>node.name).getText(), node.getSourceFile());
    } else {
      const parentNode = <typescript.ClassDeclaration>node.parent;
      const parentName = this.mangleGlobalName((<typescript.Identifier>parentNode.name).getText(), parentNode.getSourceFile());
      if (node.kind === typescript.SyntaxKind.Constructor)
        name = parentName;
      else if (typescript.isStatic(node))
        name = parentName + "." + (<typescript.Identifier>node.name).getText();
      else
        name = parentName + "#" + (<typescript.Identifier>node.name).getText();
    }

    if (this.functionTemplates[name])
      throw Error("function '" + name + "' has already been initialized");

    const template = this.functionTemplates[name] = new reflection.FunctionTemplate(name, node);
    typescript.setReflectedFunctionTemplate(node, template);
    if (template.isGeneric) {
      if (builtins.isBuiltin(name)) // generic builtins evaluate type parameters dynamically
        typescript.setReflectedFunction(node, new reflection.Function(name, node, {}, [], reflection.voidType));
      return;
    }

    const instance = this.functions[name] = template.resolve(this, []);
    instance.initialize(this);
    typescript.setReflectedFunction(node, instance);
  }

  initializeClass(node: typescript.ClassDeclaration): void {
    const name = this.mangleGlobalName((<typescript.Identifier>node.name).getText(), node.getSourceFile());

    if (this.classTemplates[name])
      throw Error("class '" + name + "' has already been initialized");

    if (node.getSourceFile() === this.entryFile && typescript.isExport(node))
      this.warn(node.getFirstToken(), "Exporting classes is not supported yet");

    const template = this.classTemplates[name] = new reflection.ClassTemplate(name, node);
    typescript.setReflectedClassTemplate(node, template);
    if (template.isGeneric)
      return;

    const instance = this.classes[name] = template.resolve(this, []);
    instance.initialize(this);
    typescript.setReflectedClass(node, instance);
  }

  initializeEnum(node: typescript.EnumDeclaration): void {
    const name = this.mangleGlobalName(node.name.getText(), node.getSourceFile());

    if (this.enums[name])
      throw Error("enum '" + name + "' has already been initialized");

    if (node.getSourceFile() === this.entryFile && typescript.isExport(node))
      this.warn(node.getFirstToken(), "Exporting enums is not supported yet");

    const instance = this.enums[name] = new reflection.Enum(name, node);
    instance.initialize(this);
  }

  compile(): void {

    const sourceFiles = this.program.getSourceFiles();
    for (let i = 0, k = sourceFiles.length; i < k; ++i) {

      if (sourceFiles[i].isDeclarationFile)
        continue;

      const statements = sourceFiles[i].statements;
      for (let j = 0, l = statements.length, statement; j < l; ++j) {
        switch ((statement = statements[j]).kind) {

          case typescript.SyntaxKind.FunctionDeclaration:
          {
            // TODO: Theoretically, it would be sufficient to start by compiling entry file exports
            // and then rely on the compiler to automatically traverse through call expressions and
            // compile everything else on demand. This might significantly reduce compilation time
            // for large projects because unused functions wouldn't be compiled at all, similar to
            // built-in tree-shaking, but it also prevents subsequent build-steps from accessing
            // yet intentionally unused functions, i.e. when linking additional functionality later
            // on that relies on these unused functions. Maybe as an option?
            const declaration = <typescript.FunctionDeclaration>statement;
            const instance = typescript.getReflectedFunction(declaration);
            if (instance) // otherwise generic
              this.compileFunction(instance);
            break;
          }

          case typescript.SyntaxKind.ClassDeclaration:
          {
            // TODO: See comment above. This also applies to class members.
            const declaration = <typescript.ClassDeclaration>statement;
            const instance = typescript.getReflectedClass(declaration);
            if (instance) // otherwise generic
              this.compileClass(instance);
            break;
          }

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
      body[i] = this.globalInitializers[i]; // setGlobal
    if (this.userStartFunction)
      body[i] = op.call("start", [], binaryen.none);

    const startSignatureIdentifier = "v";
    let signature = this.signatures[startSignatureIdentifier];
    if (!signature) {
      signature = this.signatures[startSignatureIdentifier] = this.module.getFunctionType(binaryen.none, []);
      if (!signature)
        signature = this.signatures[startSignatureIdentifier] = this.module.addFunctionType(startSignatureIdentifier, binaryen.none, []);
    }
    this.module.setStart(
      this.module.addFunction(this.userStartFunction ? "executeGlobalInitializersAndCallStart" : "executeGlobalInitalizers", signature, [], op.block("", body))
    );
  }

  compileFunction(instance: reflection.Function): binaryen.Function | null {

    // Handle imports
    if (instance.isImport) {
      let moduleName: string;
      let baseName: string;

      const idx = instance.name.indexOf("$");
      if (idx > 0) {
        moduleName = instance.name.substring(0, idx);
        baseName = instance.name.substring(idx + 1);
      } else {
        moduleName = "env";
        baseName = instance.name;
      }

      this.module.addImport(instance.name, moduleName, baseName, instance.binaryenSignature);
      return null;
    }

    // Otherwise compile
    if (!instance.body)
      throw Error("cannot compile a function without a body");

    const body: binaryen.Statement[] = [];
    const previousFunction = this.currentFunction;
    this.currentFunction = instance;
    const initialLocalsIndex = instance.locals.length;

    if (instance.body.kind === typescript.SyntaxKind.Block) {
      const blockNode = <typescript.Block>instance.body;
      for (let i = 0, k = blockNode.statements.length; i < k; ++i) {
        const statementNode = blockNode.statements[i];
        body.push(this.compileStatement(statementNode));
      }
    } else {
      const expressionNode = <typescript.Expression>instance.body;
      body.push(this.module.return(
        this.compileExpression(expressionNode, instance.returnType)
      ));
    }

    const additionalLocals = instance.locals.slice(initialLocalsIndex).map(local => binaryen.typeOf(local.type, this.uintptrSize));
    const binaryenFunction = this.module.addFunction(instance.name, instance.binaryenSignature, additionalLocals, this.module.block("", body));

    if (instance.isExport)
      this.module.addExport(instance.name, instance.name);

    if (instance.name === "start" && instance.parameters.length === 0 && instance.returnType === binaryen.none)
      this.userStartFunction = binaryenFunction;

    this.currentFunction = previousFunction;
    return binaryenFunction;
  }

  compileClass(instance: reflection.Class): void {
    for (let i = 0, k = instance.declaration.members.length; i < k; ++i) {
      const member = instance.declaration.members[i];
      switch (member.kind) {

        case typescript.SyntaxKind.Constructor:
        case typescript.SyntaxKind.MethodDeclaration:
          this.compileFunction(typescript.getReflectedFunction(<typescript.ConstructorDeclaration>member));
          break;

        // otherwise already reported by initialize
      }
    }
  }

  enterBreakContext(): string {
    if (this.currentFunction.breakDepth === 0)
      ++this.currentFunction.breakNumber;
    ++this.currentFunction.breakDepth;
    return this.currentFunction.breakLabel;
  }

  leaveBreakContext(): void {
    if (this.currentFunction.breakDepth < 1)
      throw Error("unbalanced break context");
    --this.currentFunction.breakDepth;
  }

  get currentBreakLabel(): string { return this.currentFunction.breakLabel; }

  compileStatement(node: typescript.Statement): binaryen.Statement {
    const op = this.module;

    switch (node.kind) {

      case typescript.SyntaxKind.TypeAliasDeclaration:
        return op.nop(); // already handled by TypeScript

      case typescript.SyntaxKind.EmptyStatement:
        return statements.compileEmpty(this/*, <typescript.EmptyStatement>node*/);

      case typescript.SyntaxKind.VariableStatement:
        return statements.compileVariable(this, <typescript.VariableStatement>node);

      case typescript.SyntaxKind.IfStatement:
        return statements.compileIf(this, <typescript.IfStatement>node);

      case typescript.SyntaxKind.SwitchStatement:
        return statements.compileSwitch(this, <typescript.SwitchStatement>node);

      case typescript.SyntaxKind.WhileStatement:
        return statements.compileWhile(this, <typescript.WhileStatement>node);

      case typescript.SyntaxKind.DoStatement:
        return statements.compileDo(this, <typescript.DoStatement>node);

      case typescript.SyntaxKind.ForStatement:
        return statements.compileFor(this, <typescript.ForStatement>node);

      case typescript.SyntaxKind.Block:
        return statements.compileBlock(this, <typescript.Block>node);

      case typescript.SyntaxKind.BreakStatement:
      case typescript.SyntaxKind.ContinueStatement:
        return statements.compileBreak(this, <typescript.BreakStatement | typescript.ContinueStatement>node);

      case typescript.SyntaxKind.ExpressionStatement:
        return statements.compileExpressionStatement(this, <typescript.ExpressionStatement>node);

      case typescript.SyntaxKind.ReturnStatement:
        return statements.compileReturn(this, <typescript.ReturnStatement>node);

    }

    this.error(node, "Unsupported statement node", typescript.SyntaxKind[node.kind]);
    return op.unreachable();
  }

  compileExpression(node: typescript.Expression, contextualType: reflection.Type): binaryen.Expression {
    const op = this.module;

    switch (node.kind) {

      case typescript.SyntaxKind.ParenthesizedExpression:
        return expressions.compileParenthesized(this, <typescript.ParenthesizedExpression>node, contextualType);

      case typescript.SyntaxKind.AsExpression:
        return expressions.compileAs(this, <typescript.AsExpression>node, contextualType);

      case typescript.SyntaxKind.BinaryExpression:
        return expressions.compileBinary(this, <typescript.BinaryExpression>node, contextualType);

      case typescript.SyntaxKind.PrefixUnaryExpression:
        return expressions.compilePrefixUnary(this, <typescript.PrefixUnaryExpression>node, contextualType);

      case typescript.SyntaxKind.PostfixUnaryExpression:
        return expressions.compilePostfixUnary(this, <typescript.PostfixUnaryExpression>node, contextualType);

      case typescript.SyntaxKind.Identifier:
        return expressions.compileIdentifier(this, <typescript.Identifier>node, contextualType);

      case typescript.SyntaxKind.PropertyAccessExpression:
        return expressions.compilePropertyAccess(this, <typescript.PropertyAccessExpression>node, contextualType);

      case typescript.SyntaxKind.ElementAccessExpression:
        return expressions.compileElementAccess(this, <typescript.ElementAccessExpression>node, contextualType);

      case typescript.SyntaxKind.ConditionalExpression:
        return expressions.compileConditional(this, <typescript.ConditionalExpression>node, contextualType);

      case typescript.SyntaxKind.CallExpression:
        return expressions.compileCall(this, <typescript.CallExpression>node, contextualType);

      case typescript.SyntaxKind.NewExpression:
        return expressions.compileNew(this, <typescript.NewExpression>node, contextualType);

      case typescript.SyntaxKind.NumericLiteral:
        return expressions.compileLiteral(this, <typescript.LiteralExpression>node, contextualType);

      case typescript.SyntaxKind.TrueKeyword:
      case typescript.SyntaxKind.FalseKeyword:

        typescript.setReflectedType(node, reflection.boolType);
        return binaryen.valueOf(reflection.boolType, this.module, node.kind === typescript.SyntaxKind.TrueKeyword ? 1 : 0);

      case typescript.SyntaxKind.NullKeyword:

        typescript.setReflectedType(node, this.uintptrType);
        return binaryen.valueOf(this.uintptrType, this.module, 0);
    }

    this.error(node, "Unsupported expression node", typescript.SyntaxKind[node.kind]);
    typescript.setReflectedType(node, contextualType);
    return op.unreachable();
  }

  maybeConvertValue(node: typescript.Expression, expr: binaryen.Expression, fromType: reflection.Type, toType: reflection.Type, explicit: boolean): binaryen.Expression {
    if (fromType.kind === toType.kind)
      return expr;

    const compiler = this;
    const op = this.module;

    function illegalImplicitConversion() {
      compiler.error(node, "Illegal implicit conversion", "'" + fromType + "' to '" + toType + "'");
      explicit = true; // report this only once for the topmost node
    }

    if (!explicit) {

      if (this.uintptrSize === 4 && fromType.kind === reflection.TypeKind.uintptr && toType.isInt)
        this.warn(node, "Non-portable conversion", "Implicit conversion from 'uintptr' to 'uint' will fail when targeting WASM64");

      if (this.uintptrSize === 8 && fromType.isLong && toType.kind === reflection.TypeKind.uintptr)
        this.warn(node, "Non-portable conversion", "Implicit conversion from 'ulong' to 'uintptr' will fail when targeting WASM32");
    }

    typescript.setReflectedType(node, toType);

    if (fromType === reflection.floatType) {

      if (!explicit && toType !== reflection.doubleType)
        illegalImplicitConversion();

      switch (toType) {

        case reflection.byteType:
        case reflection.ushortType:
        case reflection.uintType:
        case reflection.uintptrType32:
        case reflection.boolType:
          return this.maybeConvertValue(node, op.i32.trunc_u.f32(expr), reflection.intType, toType, explicit);

        case reflection.sbyteType:
        case reflection.shortType:
        case reflection.intType:
          return this.maybeConvertValue(node, op.i32.trunc_s.f32(expr), reflection.intType, toType, explicit);

        case reflection.uintptrType64:
        case reflection.ulongType:
          return op.i64.trunc_u.f32(expr);

        case reflection.longType:
          return op.i64.trunc_s.f32(expr);

        // floatType == floatType

        case reflection.doubleType:
          return op.f64.promote(expr);

      }

    } else if (fromType === reflection.doubleType) {

      if (!explicit) illegalImplicitConversion();

      switch (toType) {

        case reflection.byteType:
        case reflection.ushortType:
        case reflection.uintType:
        case reflection.uintptrType32:
        case reflection.boolType:
          return this.maybeConvertValue(node, op.i32.trunc_u.f64(expr), reflection.intType, toType, explicit);

        case reflection.sbyteType:
        case reflection.shortType:
        case reflection.intType:
          return this.maybeConvertValue(node, op.i32.trunc_s.f64(expr), reflection.intType, toType, explicit);

        case reflection.ulongType:
        case reflection.uintptrType64:
          return op.i64.trunc_u.f64(expr);

        case reflection.longType:
          return op.i64.trunc_s.f64(expr);

        case reflection.floatType:
          return op.f32.demote(expr);

        // doubleType == doubleType

      }

    } else if (toType === reflection.floatType) { // int to float

      switch (fromType) {

        case reflection.uintType:
        case reflection.uintptrType32:
          if (!explicit) illegalImplicitConversion();

        case reflection.byteType:
        case reflection.ushortType:
        case reflection.boolType:
          return op.f32.convert_u.i32(expr);

        case reflection.intType:
          if (!explicit) illegalImplicitConversion();

        case reflection.sbyteType:
        case reflection.shortType:
          return op.f32.convert_s.i32(expr);

        case reflection.ulongType:
        case reflection.uintptrType64:
          if (!explicit) illegalImplicitConversion();
          return op.f32.convert_u.i64(expr);

        case reflection.longType:
          if (!explicit) illegalImplicitConversion();
          return op.f32.convert_s.i64(expr);

      }

    } else if (toType === reflection.doubleType) { // int to double

      switch (fromType) {

        case reflection.uintType:
        case reflection.uintptrType32:
        case reflection.byteType:
        case reflection.ushortType:
        case reflection.boolType:
          return op.f64.convert_u.i32(expr);

        case reflection.intType:
        case reflection.sbyteType:
        case reflection.shortType:
          return op.f64.convert_s.i32(expr);

        case reflection.ulongType:
        case reflection.uintptrType64:
          if (!explicit) illegalImplicitConversion();
          return op.f64.convert_u.i64(expr);

        case reflection.longType:
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
      fromType = fromType.isSigned ? reflection.intType : reflection.uintType;

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

  maybeResolveAlias(symbol: typescript.Symbol): typescript.Symbol {

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
        return symbol;
    }

    // Otherwise follow any aliases to the original type
    if (symbol.declarations)
      for (let i = 0, k = symbol.declarations.length; i < k; ++i) {
        const declaration = symbol.declarations[i];
        if (declaration.kind === typescript.SyntaxKind.TypeAliasDeclaration) {
          const aliasDeclaration = <typescript.TypeAliasDeclaration>declaration;
          if (aliasDeclaration.type.kind === typescript.SyntaxKind.TypeReference) {
            const symbolAtLocation = this.checker.getSymbolAtLocation((<typescript.TypeReferenceNode>aliasDeclaration.type).typeName);
            if (symbolAtLocation)
              return this.maybeResolveAlias(symbolAtLocation);
          }
        }
      }

    return symbol;
  }

  resolveType(type: typescript.TypeNode, acceptVoid: boolean = false): reflection.Type {

    switch (type.kind) {

      case typescript.SyntaxKind.VoidKeyword:
        if (!acceptVoid)
          this.error(type, "Illegal type", "void");
        return reflection.voidType;

      case typescript.SyntaxKind.TypeReference:
      {
        const referenceNode = <typescript.TypeReferenceNode>type;
        const symbolAtLocation = this.checker.getSymbolAtLocation(referenceNode.typeName);
        if (symbolAtLocation) {
          const symbol = this.maybeResolveAlias(symbolAtLocation);
          if (symbol) {

            // Exit early if it's a basic type
            switch (symbol.name) {
              case "byte": return reflection.byteType;
              case "sbyte": return reflection.sbyteType;
              case "short": return reflection.shortType;
              case "ushort": return reflection.ushortType;
              case "int": return reflection.intType;
              case "uint": return reflection.uintType;
              case "long": return reflection.longType;
              case "ulong": return reflection.ulongType;
              case "bool": return reflection.boolType;
              case "float": return reflection.floatType;
              case "double": return reflection.doubleType;
              case "uintptr": return this.uintptrType;
            }

            const reference = this.resolveReference(referenceNode.typeName);
            if (reference instanceof reflection.Class)
              return (<reflection.Class>reference).type;
          }
        }
      }
    }

    this.error(type, "Unsupported type", type.getText() + "\n" + (new Error().stack));
    return reflection.voidType;
  }

  resolveReference(node: typescript.Identifier | typescript.EntityName): reflection.Variable | reflection.Enum | reflection.Class | null {

    // Locals including 'this'
    const localName = node.getText();
    if (this.currentFunction && this.currentFunction.localsByName[localName])
      return this.currentFunction.localsByName[localName];

    // Globals
    const symbol = this.checker.getSymbolAtLocation(node);
    if (symbol && symbol.declarations) { // Determine declaration site

      for (let i = 0, k = symbol.declarations.length; i < k; ++i) {
        const declaration = symbol.declarations[i];

        if (declaration.symbol) {
          const globalName = this.mangleGlobalName(declaration.symbol.name, declaration.getSourceFile());

          if (this.globals[globalName])
            return this.globals[globalName];

          if (this.enums[globalName])
            return this.enums[globalName];

          if (this.classes[globalName])
            return <reflection.Class>this.classes[globalName];
        }
      }
    }
    return null;
  }
}

export { Compiler as default };
