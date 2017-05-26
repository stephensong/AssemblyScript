import {
  Compiler
} from "../compiler";

import {
  WasmType,
  WasmExpression
} from "../wasm";

export function compile(compiler: Compiler, node: ts.AsExpression, contextualType: WasmType): WasmExpression {
  const type = compiler.resolveType(node.type);
  (<any>node).wasmType = type;
  return compiler.maybeConvertValue(node, compiler.compileExpression(node.expression, contextualType), <WasmType>(<any>node.expression).wasmType, type, true);
}
