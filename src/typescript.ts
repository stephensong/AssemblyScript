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
  convertToRelativePath,
  createGetCanonicalFileName,
  createDiagnosticCollection,
  createDiagnosticForNode,
  createProgram,
  createSourceFile,
  flattenDiagnosticMessageText

} from "byots";

import * as ts from "byots";

// Polyfill 'sys' in browsers
import * as browsersys from "./typescript/browsersys";
export const sys = ts.sys || browsersys;

export * from "./typescript/diagnostics";

/** Tests if the specified node has an 'export' modifier. */
export function isExport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword)
        return true;
  return false;
}

/** Tests if the specified node has a 'declare' modifier. */
export function isImport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

/** Tests if the specified node has a 'static' modifier or is otherwise part of a static context. */
export function isStatic(node: ts.Node): boolean {
  return (<ts.ModifierFlags>node.modifierFlagsCache & ts.ModifierFlags.Static) !== 0;
}

/** Tests if the specified node is flagged 'const'. */
export function isConst(node: ts.Node): boolean {
  return (node.flags & ts.NodeFlags.Const) !== 0;
}

/** Gets the reflected type of an expression. */
export function getReflectedType(node: ts.Expression): reflection.Type {
  return <reflection.Type>(<any>node).reflectedType || null;
}

/** Sets the reflected type of an expression. */
export function setReflectedType(node: ts.Expression, type: reflection.Type): void {
  if (!type) throw Error("type cannot be null");
  (<any>node).reflectedType = type;
}

/** Gets the reflected function instance (describing a function with generic types resolved) of a function declaration. */
export function getReflectedFunction(node: ts.FunctionLikeDeclaration): reflection.Function {
  return <reflection.Function>(<any>node).reflectedFunction || null;
}

/** Sets the reflected function instance (describing a function with generic types resolved) of a function declaration. */
export function setReflectedFunction(node: ts.FunctionLikeDeclaration, instance: reflection.Function): void {
  if (!instance)
    throw Error("instance cannot be null");
  (<any>node).reflectedFunction = instance;
}

/** Gets the reflected function template (describing a function with unresolved generic types) of a function declaration. */
export function getReflectedFunctionTemplate(node: ts.FunctionLikeDeclaration): reflection.FunctionTemplate {
  return <reflection.FunctionTemplate>(<any>node).reflectedFunctionTemplate || null;
}

/** Sets the reflected function template (describing a function with unresolved generic types) of a function declaration. */
export function setReflectedFunctionTemplate(node: ts.FunctionLikeDeclaration, template: reflection.FunctionTemplate): void {
  if (!template)
    throw Error("template cannot be null");
  (<any>node).reflectedFunctionTemplate = template;
}

/** Gets the reflected class instance (describing a class with generic types resolved) of a class declaration. */
export function getReflectedClass(node: ts.ClassDeclaration): reflection.Class {
  return <reflection.Class>(<any>node).reflectedClass || null;
}

/** Sets the reflected class instance (describing a class with generic types resolved) of a class declaration. */
export function setReflectedClass(node: ts.ClassDeclaration, instance: reflection.Class): void {
  if (!instance)
    throw Error("instance cannot be null");
  (<any>node).reflectedClass = instance;
}

/** Gets the reflected class template (describing a class with unresolved generic types) of a class declaration. */
export function getReflectedClassTemplate(node: ts.ClassDeclaration): reflection.ClassTemplate {
  return <reflection.ClassTemplate>(<any>node).reflectedClass || null;
}

/** Sets the reflected class template (describing a class with unresolved generic types) of a class declaration. */
export function setReflectedClassTemplate(node: ts.ClassDeclaration, template: reflection.ClassTemplate): void {
  if (!template)
    throw Error("template cannot be null");
  (<any>node).reflectedClassTemplate = template;
}
