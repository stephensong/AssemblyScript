import * as path from "path";
import * as reflection from "./reflection";

// Reasoning behind this file is that it's just too easy to lose track of this stuff so
// having a clear overview of / a handle on things becomes something valuable quickly.

export {

  // Classes and interfaces
  ArrayTypeNode,
  AsExpression,
  BinaryExpression,
  Block,
  BreakStatement,
  CallExpression,
  ClassDeclaration,
  CompilerHost,
  CompilerOptions,
  ConditionalExpression,
  ConstructorDeclaration,
  ContinueStatement,
  DiagnosticCategory,
  DiagnosticCollection,
  DiagnosticMessage,
  Declaration,
  Diagnostic,
  DoStatement,
  ElementAccessExpression,
  EnumDeclaration,
  EnumMember,
  EntityName,
  ExpressionStatement,
  Expression,
  FormatDiagnosticsHost,
  ForStatement,
  FunctionBody,
  FunctionLikeDeclaration,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  LiteralExpression,
  MethodDeclaration,
  Modifier,
  ModuleKind,
  NewExpression,
  NodeArray,
  NodeFlags,
  Node,
  ParameterDeclaration,
  ParenthesizedExpression,
  PostfixUnaryExpression,
  PrefixUnaryExpression,
  Program,
  PropertyAccessExpression,
  PropertyDeclaration,
  TypeAliasDeclaration,
  TypeChecker,
  TypeNode,
  TypeParameterDeclaration,
  TypeReferenceNode,
  TypeReference,
  Type,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  ReturnStatement,
  ScriptTarget,
  SourceFile,
  Statement,
  SwitchStatement,
  Symbol,
  SyntaxKind,
  System,
  WhileStatement,

  // Global functions
  getPreEmitDiagnostics,
  getSourceFileOfNode,
  getTextOfNode,
  createDiagnosticCollection,
  createProgram,
  createSourceFile

} from "../lib/typescript/build";

import {
  ClassDeclaration,
  CompilerHost,
  CompilerOptions,
  Diagnostic,
  DiagnosticCategory,
  Expression,
  FormatDiagnosticsHost,
  FunctionLikeDeclaration,
  ModifierFlags,
  ModuleKind,
  Node,
  NodeFlags,
  ResolvedModule,
  ScriptTarget,
  SourceFile,
  SyntaxKind,
  createDiagnosticForNode,
  createGetCanonicalFileName,
  createSourceFile,
  formatDiagnostics as formatDiagnostics_default,
  formatDiagnosticsWithColorAndContext as formatDiagnosticsWithColorAndContext_default,
  resolveModuleName,
  sys
} from "../lib/typescript/build";

export const defaultFormatDiagnosticsHost: FormatDiagnosticsHost = {
  getCurrentDirectory: () => sys.getCurrentDirectory(),
  getNewLine: () => sys.newLine,
  getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
};

export const defaultCompilerOptions = <CompilerOptions>{
  target: ScriptTarget.Latest,
  module: ModuleKind.None,
  noLib: true,
  experimentalDecorators: true,
  types: []
};

import * as library from "./library";

export function createCompilerHost(moduleSearchLocations: string[], entryFileSource?: string, entryFileName: string = "module.ts"): CompilerHost {
  const files: { [key: string]: SourceFile } = {};
  if (entryFileSource)
    files[entryFileName] = createSourceFile(entryFileName, <string>entryFileSource, ScriptTarget.Latest);
  Object.keys(library.files).forEach(name => {
    files[name] = createSourceFile(name, library.files[name], ScriptTarget.Latest);
  });

  return {
    getSourceFile,
    getDefaultLibFileName: () => "assembly.d.ts",
    writeFile: (filename: string, content: string) => sys.writeFile(filename, content),
    getCurrentDirectory: () => sys.getCurrentDirectory(),
    getDirectories: (path: string) => sys.getDirectories(path),
    getCanonicalFileName: fileName => sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => sys.newLine,
    useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
    fileExists,
    readFile,
    resolveModuleNames
  };

  function fileExists(fileName: string): boolean {
    return !!files[fileName] || sys.fileExists(fileName);
  }

  function readFile(fileName: string): string {
    return files[fileName] ? files[fileName].text : sys.readFile(fileName);
  }

  function getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
    if (files[fileName])
      return files[fileName];
    const sourceText = sys.readFile(fileName);
    if (sourceText === undefined && onError)
      onError("file not found: " + fileName);
    return files[fileName] = createSourceFile(fileName, sourceText || "", languageVersion);
  }

  function resolveModuleNames(moduleNames: string[], containingFile: string): ResolvedModule[] {
    return <ResolvedModule[]>moduleNames.map(moduleName => {
      // try to use standard resolution
      const result = resolveModuleName(moduleName, containingFile, defaultCompilerOptions, { fileExists, readFile });
      if (result.resolvedModule)
        return result.resolvedModule;
      // check fallback locations, for simplicity assume that module at location should be represented by '.d.ts' file
      for (const location of moduleSearchLocations) {
        const modulePath = path.join(location, moduleName + ".d.ts");
        if (fileExists(modulePath))
          return { resolvedFileName: modulePath };
      }
      return undefined;
    });
  }
}

/** Creates a diagnostic message referencing a node. */
export function createDiagnosticForNodeEx(node: Node, category: DiagnosticCategory, message: string, arg1?: string) {
  let realMessage = message;
  if (arg1 != null)
    realMessage += ": " + arg1;
  return createDiagnosticForNode(node, {
    key: message.toLowerCase().replace(/\s+/g, "_").replace(/[^\w]/g, ""),
    category: category,
    code: <any>"-AS",
    message: realMessage
  });
}

/** Formats a diagnostic message in plain text. */
export function formatDiagnostics(diagnostics: Diagnostic[], host?: FormatDiagnosticsHost) {
  return formatDiagnostics_default(diagnostics, host || defaultFormatDiagnosticsHost);
}

/** Formats a diagnostic message with terminal colors and source context. */
export function formatDiagnosticsWithColorAndContext(diagnostics: Diagnostic[], host?: FormatDiagnosticsHost) {
  return formatDiagnosticsWithColorAndContext_default(diagnostics, host || defaultFormatDiagnosticsHost);
}

/** Prints a diagnostic message to console. */
export function printDiagnostic(diagnostic: Diagnostic): void {
  if ((<any>sys).browser) {
    if (diagnostic.category === DiagnosticCategory.Message)
      process.stderr.write(formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else
      process.stderr.write(formatDiagnosticsWithColorAndContext([ diagnostic ], defaultFormatDiagnosticsHost) + "\n");
  } else {
    if (diagnostic.category === DiagnosticCategory.Message)
      (console.info || console.log)(formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else if (diagnostic.category === DiagnosticCategory.Warning)
      (console.warn || console.log)(formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else
      (console.error || console.log)(formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
  }
}

/** Tests if the specified node has an 'export' modifier. */
export function isExport(node: Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === SyntaxKind.ExportKeyword)
        return true;
  return false;
}

/** Tests if the specified node has a 'declare' modifier. */
export function isImport(node: Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

/** Tests if the specified node has a 'static' modifier or is otherwise part of a static context. */
export function isStatic(node: Node): boolean {
  return (<ModifierFlags>node.modifierFlagsCache & ModifierFlags.Static) !== 0;
}

/** Tests if the specified node is flagged 'const'. */
export function isConst(node: Node): boolean {
  return (node.flags & NodeFlags.Const) !== 0;
}

/** Gets the reflected type of an expression. */
export function getReflectedType(node: Expression): reflection.Type {
  return <reflection.Type>(<any>node).reflectedType || null;
}

/** Sets the reflected type of an expression. */
export function setReflectedType(node: Expression, type: reflection.Type): void {
  if (!type) throw Error("type cannot be null");
  (<any>node).reflectedType = type;
}

/** Gets the reflected function instance (describing a function with generic types resolved) of a function declaration. */
export function getReflectedFunction(node: FunctionLikeDeclaration): reflection.Function {
  return <reflection.Function>(<any>node).reflectedFunction || null;
}

/** Sets the reflected function instance (describing a function with generic types resolved) of a function declaration. */
export function setReflectedFunction(node: FunctionLikeDeclaration, instance: reflection.Function): void {
  if (!instance)
    throw Error("instance cannot be null");
  (<any>node).reflectedFunction = instance;
}

/** Gets the reflected function template (describing a function with unresolved generic types) of a function declaration. */
export function getReflectedFunctionTemplate(node: FunctionLikeDeclaration): reflection.FunctionTemplate {
  return <reflection.FunctionTemplate>(<any>node).reflectedFunctionTemplate || null;
}

/** Sets the reflected function template (describing a function with unresolved generic types) of a function declaration. */
export function setReflectedFunctionTemplate(node: FunctionLikeDeclaration, template: reflection.FunctionTemplate): void {
  if (!template)
    throw Error("template cannot be null");
  (<any>node).reflectedFunctionTemplate = template;
}

/** Gets the reflected class instance (describing a class with generic types resolved) of a class declaration. */
export function getReflectedClass(node: ClassDeclaration): reflection.Class {
  return <reflection.Class>(<any>node).reflectedClass || null;
}

/** Sets the reflected class instance (describing a class with generic types resolved) of a class declaration. */
export function setReflectedClass(node: ClassDeclaration, instance: reflection.Class): void {
  if (!instance)
    throw Error("instance cannot be null");
  (<any>node).reflectedClass = instance;
}

/** Gets the reflected class template (describing a class with unresolved generic types) of a class declaration. */
export function getReflectedClassTemplate(node: ClassDeclaration): reflection.ClassTemplate {
  return <reflection.ClassTemplate>(<any>node).reflectedClass || null;
}

/** Sets the reflected class template (describing a class with unresolved generic types) of a class declaration. */
export function setReflectedClassTemplate(node: ClassDeclaration, template: reflection.ClassTemplate): void {
  if (!template)
    throw Error("template cannot be null");
  (<any>node).reflectedClassTemplate = template;
}
