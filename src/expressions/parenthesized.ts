import { Compiler } from "../compiler";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileParenthesized(compiler: Compiler, node: ts.ParenthesizedExpression, contextualType: wasm.Type): binaryen.Expression {
  const expression = compiler.compileExpression(node.expression, contextualType);

  setWasmType(node, getWasmType(node.expression));
  return expression;
}
