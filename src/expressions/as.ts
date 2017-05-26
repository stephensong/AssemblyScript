import {
  Compiler
} from "../compiler";

import {
  WasmType,
  WasmExpression
} from "../wasm";

export function compileAs(compiler: Compiler, node: ts.AsExpression, contextualType: WasmType): WasmExpression {
  const toType = compiler.resolveType(node.type);

  (<any>node).wasmType = toType;
  return compiler.maybeConvertValue(node, compiler.compileExpression(node.expression, contextualType), <WasmType>(<any>node.expression).wasmType, toType, true);
}
