import { Compiler } from "../compiler";
import { binaryen } from "../wasm";
import { binaryenTypeOf } from "../util";
import * as wasm from "../wasm";

export function compileIdentifier(compiler: Compiler, node: ts.Identifier, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;
  const referencedLocal = compiler.currentLocals[node.text];

  if (referencedLocal) {
    (<any>node).wasmType = referencedLocal.type;
    return op.getLocal(referencedLocal.index, binaryenTypeOf(referencedLocal.type, compiler.uintptrSize));
  }

  compiler.error(node, "Undefined local variable", node.text);

  (<any>node).wasmType = contextualType;
  return op.unreachable();
}
