import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { binaryenTypeOf, binaryenValueOf, setWasmType } from "../util";
import * as wasm from "../wasm";

export function compileIdentifier(compiler: Compiler, node: ts.Identifier, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  const reference = compiler.resolveReference(node);
  if (reference) {
    switch (reference.kind) {

      case wasm.ReflectionObjectKind.Variable:
      {
        const variable = <wasm.Variable>reference;
        setWasmType(node, variable.type);
        return op.getLocal(variable.index, binaryenTypeOf(variable.type, compiler.uintptrSize));
      }

      case wasm.ReflectionObjectKind.Constant:
      {
        const constant = <wasm.Constant>reference;
        setWasmType(node, constant.type);
        return binaryenValueOf(constant.type, op, constant.value);
      }

      case wasm.ReflectionObjectKind.Global:
      {
        const global = <wasm.Global>reference;
        setWasmType(node, global.type);
        return op.getGlobal(global.name, binaryenTypeOf(global.type, compiler.uintptrSize));
      }
    }
  }

  compiler.error(node, "Unresolvable identifier", node.text);
  setWasmType(node, contextualType);
  return op.unreachable();
}
