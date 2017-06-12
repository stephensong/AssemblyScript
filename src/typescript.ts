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
  getLineAndCharacterOfPosition,
  getPreEmitDiagnostics,
  getPositionOfLineAndCharacter,
  getSourceFileOfNode,
  getTextOfNode,
  convertToRelativePath,
  createDiagnosticCollection,
  createDiagnosticForNode,
  createGetCanonicalFileName,
  createProgram,
  createSourceFile,
  flattenDiagnosticMessageText,
  formatDiagnostics,
  formatDiagnosticsWithColorAndContext

} from "../lib/typescript/build";

import {
  ClassDeclaration,
  Diagnostic,
  DiagnosticCategory,
  Expression,
  FormatDiagnosticsHost,
  FunctionLikeDeclaration,
  ModifierFlags,
  Node,
  NodeFlags,
  SyntaxKind,
  createDiagnosticForNode,
  createGetCanonicalFileName,
  formatDiagnostics,
  formatDiagnosticsWithColorAndContext,
  sys as defaultsys
} from "../lib/typescript/build";

// Polyfill 'sys' in browsers
export const sys = defaultsys || {
  args: [],
  newLine: "\n",
  useCaseSensitiveFileNames: true,
  write(s: string) {
    // tslint:disable-next-line
    console.log(s);
  },
  getCurrentDirectory(): string {
    return ".";
  },
  getDirectories(): string[] {
    return [ "." ];
  },
  fileExists(/* path: string */): boolean {
    return false;
  },
  directoryExists(path: string): boolean {
    return path === ".";
  },
  readFile(/* path: string, encoding?: string */): string {
    throw Error("not implemented");
  },
  writeFile(/* path: string, data: string, writeByteOrderMark?: boolean */): void {
    throw Error("not implemented");
  },
  resolvePath(/* path: string */): string {
    throw Error("not implemented");
  },
  createDirectory(/* path: string */): void {
    throw Error("not implemented");
  },
  getExecutingFilePath(): string {
    throw Error("not implemented");
  },
  readDirectory(/* path: string, extensions?: string[], exclude?: string[], include?: string[] */): string[] {
    throw Error("not implemented");
  },
  exit(/* exitCode?: number */): void {
    throw Error("not implemented");
  },
  getEnvironmentVariable(/* name: string */): string {
    throw Error("not implemented");
  }
};

const defaultFormatDiagnosticsHost: FormatDiagnosticsHost = {
  getCurrentDirectory: () => sys.getCurrentDirectory(),
  getNewLine: () => sys.newLine,
  getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
};

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

/** Prints a diagnostic message to console. */
export function printDiagnostic(diagnostic: Diagnostic): void {
  if (sys === defaultsys) {
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
