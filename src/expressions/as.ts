import { Compiler } from "../compiler";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileAs(compiler: Compiler, node: ts.AsExpression, contextualType: wasm.Type): binaryen.Expression {
  const toType = compiler.resolveType(node.type);

  (<any>node).wasmType = toType;
  return compiler.maybeConvertValue(node, compiler.compileExpression(node.expression, contextualType), <wasm.Type>(<any>node.expression).wasmType, toType, true);
}
