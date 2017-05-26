import {
  Compiler
} from "../compiler";

import {
  voidType
} from "../types";

import {
  WasmStatement
} from "../wasm";

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement): WasmStatement {
  const op = compiler.module;
  const expressionNode = node.expression;
  const expression = compiler.compileExpression(expressionNode, voidType);

  return (<any>expressionNode).wasmType !== voidType
    ? op.drop(expression)
    : expression;
}
