import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compilePropertyAccess(compiler: Compiler, node: typescript.PropertyAccessExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  const propertyName = (<typescript.Identifier>node.name).text;

  // identifier.identifier
  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<typescript.Identifier>node.expression);

    if (reference instanceof reflection.Enum) {
      const enm = <reflection.Enum>reference;
      typescript.setReflectedType(node, reflection.intType);
      const property = enm.properties[propertyName];
      if (property.isConstant)
        return op.i32.const(<number>property.constantValue | 0);

    } else if (reference instanceof reflection.Class) {
      // TODO: static property
    }
  }

  compiler.error(node, "Unsupported property access", typescript.SyntaxKind[node.expression.kind]);
  typescript.setReflectedType(node, contextualType);
  return op.unreachable();
}
