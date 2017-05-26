import {
  Compiler
} from "../compiler";

import {
  WasmType,
  WasmExpression
} from "../wasm";

export function compileIdentifier(compiler: Compiler, node: ts.Identifier, contextualType: WasmType): WasmExpression {
  const op = compiler.module;
  const referencedLocal = compiler.currentLocals[node.text];

  if (referencedLocal) {
    (<any>node).wasmType = referencedLocal.type;
    return op.getLocal(referencedLocal.index, referencedLocal.type.toBinaryenType(compiler.uintptrType));
  }

  compiler.error(node, "Undefined local variable", node.text);
  return op.unreachable();
}
