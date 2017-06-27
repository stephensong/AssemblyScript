/** @module assemblyscript/expressions */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import compileLoad from "./helpers/load";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileElementAccess(compiler: Compiler, node: typescript.ElementAccessExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, contextualType);

  const argumentNode = <typescript.Expression>node.argumentExpression;
  const argument = compiler.maybeConvertValue(argumentNode, compiler.compileExpression(argumentNode, compiler.uintptrType), typescript.getReflectedType(argumentNode), compiler.uintptrType, false);
  const binaryenPtrType = binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize);
  const uintptrCategory = <binaryen.I32Operations | binaryen.I64Operations>binaryen.categoryOf(compiler.uintptrType, op, compiler.uintptrSize);

  // this[?]
  if (node.expression.kind === typescript.SyntaxKind.ThisKeyword) {
    const clazz = compiler.currentFunction && compiler.currentFunction.parent || null;
    if (clazz && compiler.currentFunction.isInstance) {
      if (clazz.type.isArray) {
        const underlyingType = (<reflection.Class>clazz.type.underlyingClass).typeArguments.T.type;

        typescript.setReflectedType(node, underlyingType);
        return compileLoad(compiler, node, underlyingType,
          uintptrCategory.add(
            op.getLocal(0, binaryenPtrType),
            uintptrCategory.mul(
              argument,
              binaryen.valueOf(compiler.uintptrType, op, underlyingType.size)
            )
          ), compiler.uintptrSize
        );
      } else {
        compiler.error(node, "Array access used on non-array object");
        return op.unreachable();
      }
    } else {
      compiler.error(node.expression, "'this' keyword used in non-instance context");
      return op.unreachable();
    }

  // identifier[?]
  } else if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<typescript.Identifier>node.expression);

    if (reference instanceof reflection.Variable) {
      const variable = <reflection.Variable>reference;

      if (variable.type.isArray) {
        const underlyingType = (<reflection.Class>variable.type.underlyingClass).typeArguments.T.type;

        typescript.setReflectedType(node, variable.type);
        return compileLoad(compiler, node, underlyingType,
          uintptrCategory.add(
            compiler.compileExpression(node.expression, compiler.uintptrType),
            uintptrCategory.mul(
              argument,
              binaryen.valueOf(compiler.uintptrType, op, underlyingType.size)
            )
          ), compiler.uintptrSize
        );
      } else {
        compiler.error(node, "Array access used on non-array object");
        return op.unreachable();
      }
    }
  }

  compiler.error(node, "Unsupported element access", "SyntaxKind " + node.expression.kind);
  typescript.setReflectedType(node, contextualType);
  return op.unreachable();
}
