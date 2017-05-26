import {
  Compiler
} from "../compiler";

import {
  WasmExpression,
  WasmType
} from "../wasm";

export function compileParenthesized(compiler: Compiler, node: ts.ParenthesizedExpression, contextualType: WasmType): WasmExpression {
  const expr = compiler.compileExpression(node.expression, contextualType);
  (<any>node).wasmType = (<any>node.expression).wasmType;
  return expr;
}
