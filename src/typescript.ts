import * as reflection from "./reflection";

// Reasoning behind this file is that it's just too easy to lose track of this stuff so
// having a clear overview of / a handle on things becomes something valuable quickly.

export {

  // Classes and interfaces
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

import * as typescript from 'byots'

// Polyfill 'sys' in browsers
import * as browsersys from "./typescript/browsersys";
export const sys = typescript.sys || browsersys;

export * from "./typescript/diagnostics";

export function isExport(node: typescript.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === typescript.SyntaxKind.ExportKeyword)
        return true;
  return false;
}

export function isImport(node: typescript.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === typescript.SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

export function isStatic(node: typescript.Node): boolean {
  return (<typescript.ModifierFlags>node.modifierFlagsCache & typescript.ModifierFlags.Static) !== 0;
}

export function isConst(node: typescript.Node): boolean {
  return (node.flags & typescript.NodeFlags.Const) !== 0;
}

export function getReflectedType(node: typescript.Node): reflection.Type {
  return <reflection.Type>(<any>node).reflectedType || null;
}

export function setReflectedType(node: typescript.Node, type: reflection.Type): void {
  if (!type) throw Error("type cannot be null");
  (<any>node).reflectedType = type;
}

export function getReflectedFunction(node: typescript.FunctionLikeDeclaration): reflection.Function {
  return <reflection.Function>(<any>node).reflectedFunction || null;
}

export function setReflectedFunction(node: typescript.FunctionLikeDeclaration, func: reflection.Function): void {
  if (!func)
    throw Error("func cannot be null");
  (<any>node).reflectedFunction = func;
}

export function getReflectedClass(node: typescript.ClassDeclaration): reflection.Class {
  return <reflection.Class>(<any>node).reflectedClass || null;
}

export function setReflectedClass(node: typescript.ClassDeclaration, clazz: reflection.Class): void {
  if (!clazz)
    throw Error("clazz cannot be null");
  (<any>node).reflectedClass = clazz;
}
