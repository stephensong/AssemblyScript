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
  EntityName,
  ExpressionStatement,
  Expression,
  FormatDiagnosticsHost,
  ForStatement,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  LiteralExpression,
  MethodDeclaration,
  ModuleKind,
  NewExpression,
  NodeFlags,
  Node,
  ParenthesizedExpression,
  PostfixUnaryExpression,
  PrefixUnaryExpression,
  Program,
  PropertyAccessExpression,
  PropertyDeclaration,
  TypeAliasDeclaration,
  TypeChecker,
  TypeNode,
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

// Polyfill 'sys' in browsers
import * as browsersys from "./typescript/browsersys";
export const sys = ts.sys || browsersys;

export * from "./typescript/diagnostics";

export function isExport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword)
        return true;
  return false;
}

export function isImport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

export function isStatic(node: ts.Node): boolean {
  return (<ts.ModifierFlags>node.modifierFlagsCache & ts.ModifierFlags.Static) !== 0;
}

export function isConst(node: ts.Node): boolean {
  return (node.flags & ts.NodeFlags.Const) !== 0;
}

export function getReflectedType(node: ts.Node): reflection.Type {
  return <reflection.Type>(<any>node).reflectedType || null;
}

export function setReflectedType(node: ts.Node, type: reflection.Type): void {
  if (!type) throw Error("type cannot be null");
  (<any>node).reflectedType = type;
}

export function getReflectedFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration | ts.SignatureDeclaration): reflection.Function {
  return <reflection.Function>(<any>node).reflectedFunction || null;
}

export function setReflectedFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration, func: reflection.Function): void {
  if (!func)
    throw Error("func cannot be null");
  (<any>node).reflectedFunction = func;
}
