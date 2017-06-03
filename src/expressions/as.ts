import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { getWasmType, setWasmType } from "../util";
import * as wasm from "../wasm";

export function compileAs(compiler: Compiler, node: ts.AsExpression, contextualType: wasm.Type): binaryen.Expression {
  const toType = compiler.resolveType(node.type);

  setWasmType(node, toType);
  return compiler.maybeConvertValue(node, compiler.compileExpression(node.expression, contextualType), getWasmType(node.expression), toType, true);
}
