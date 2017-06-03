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
    const identifierNode = <ts.Identifier>node.expression;
    const symbol = identifierNode.symbol;

    if (symbol && symbol.declarations) {
      const targetName = compiler.resolveName(symbol.declarations[0]);
      const referenced = compiler.resolveIdentifier(targetName);

      if (referenced) {
        switch (referenced.kind) {

          // SomeEnum.SomeValue, always int
          case wasm.ReflectionObjectKind.Enum:
          {
            setWasmType(node, intType);
            const value = (<wasm.Enum>referenced).getValue(propertyName);
            if (value)
              return op.i32.const(value.value | 0);
            break;
          }

          // SomeClass.SomeStaticField
          case wasm.ReflectionObjectKind.Class:
          {
            // TODO
            break;
          }
        }
      }
    }
  }

  compiler.error(node, "Unsupported property access", ts.SyntaxKind[node.expression.kind]);
  setWasmType(node, contextualType);
  return op.unreachable();
}
