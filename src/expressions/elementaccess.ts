import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import { compileLoad } from "./propertyaccess";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileElementAccess(compiler: Compiler, node: typescript.ElementAccessExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  const argument = compiler.compileExpression(<typescript.Expression>node.argumentExpression, reflection.intType);

  // identifier[?]
  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<typescript.Identifier>node.expression);

    if (reference instanceof reflection.Variable) {
      const variable = <reflection.Variable>reference;
      console.log(variable.type);

      if (variable.type.isArray) {
        const underlyingType = (<reflection.Class>variable.type.underlyingClass).genericTypes[0];

        return compileLoad(compiler, node, underlyingType,
          op.i32.add(
            compiler.compileExpression(node.expression, compiler.uintptrType),
            op.i32.mul( // TODO: shift alignment
              argument,
              underlyingType.size
            )
          ), 0
        );
      }
    }
  }

  compiler.error(node, "Unsupported element access", typescript.SyntaxKind[node.expression.kind]);
  typescript.setReflectedType(node, contextualType);
  return op.unreachable();
}
