import { Compiler } from "../compiler";
import { intType } from "../types";
import * as binaryen from "../binaryen";
import { setWasmType } from "../util";
import * as wasm from "../wasm";

export function compilePropertyAccess(compiler: Compiler, node: ts.PropertyAccessExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  const propertyName = (<ts.Identifier>node.name).text;

  // identifier.identifier
  if (node.expression.kind === ts.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<ts.Identifier>node.expression);
    if (reference) {
      switch (reference.kind) {

        case wasm.ReflectionObjectKind.Enum:
        {
          setWasmType(node, intType);
          const value = (<wasm.Enum>reference).getValue(propertyName);
          if (value)
            return op.i32.const(value.value | 0);
          else
            break;
        }

        case wasm.ReflectionObjectKind.Class:
        {
          // TODO: static property
          break;
        }
      }
    }
  }

  compiler.error(node, "Unsupported property access", ts.SyntaxKind[node.expression.kind]);
  setWasmType(node, contextualType);
  return op.unreachable();
}
