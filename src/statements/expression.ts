import { Compiler } from "../compiler";
import { voidType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement): binaryen.Statement {
  const op = compiler.module;
  const expressionNode = node.expression;
  const expression = compiler.compileExpression(expressionNode, voidType);

  return getWasmType(expressionNode) !== voidType
    ? op.drop(expression)
    : expression;
}
