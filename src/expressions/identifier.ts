import { Compiler } from "../compiler";
import { binaryen } from "../wasm";
import { binaryenTypeOf, setWasmType } from "../util";
import * as wasm from "../wasm";

export function compileIdentifier(compiler: Compiler, node: ts.Identifier, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  const referencedLocal = compiler.currentLocals[node.text];
  if (referencedLocal) {
    setWasmType(node, referencedLocal.type);
    return op.getLocal(referencedLocal.index, binaryenTypeOf(referencedLocal.type, compiler.uintptrSize));
  }

  const referencedGlobal = compiler.globals[node.text];
  if (referencedGlobal) {
    setWasmType(node, referencedGlobal.type);
    return op.getGlobal(referencedGlobal.name, binaryenTypeOf(referencedGlobal.type, compiler.uintptrSize));
  }

  compiler.error(node, "Undefined variable", node.text);

  setWasmType(node, contextualType);
  return op.unreachable();
}
