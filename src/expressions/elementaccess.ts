/** @module assemblyscript/expressions */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import compileLoadOrStore from "./helpers/loadorstore";
import * as Long from "long";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

/** Compiles an element access expression. Sets the element's value to `valueNode` if specified, otherwise gets it. */
export function compileElementAccess(compiler: Compiler, node: typescript.ElementAccessExpression, contextualType: reflection.Type, valueNode?: typescript.Expression): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, contextualType);

  const argumentNode = <typescript.Expression>node.argumentExpression;
  const argument = compiler.maybeConvertValue(argumentNode, compiler.compileExpression(argumentNode, compiler.uintptrType), typescript.getReflectedType(argumentNode), compiler.uintptrType, false);

  const expression = compiler.compileExpression(node.expression, compiler.uintptrType);
  const expressionType = typescript.getReflectedType(node.expression);

  if (!(expressionType && expressionType.underlyingClass && expressionType.underlyingClass.isArray)) {
    compiler.error(node, "Array access used on non-array object");
    return op.unreachable();
  }

  const elementType = (<reflection.Class>expressionType.underlyingClass).typeArguments.T.type;
  const uintptrCategory = <binaryen.I32Operations | binaryen.I64Operations>binaryen.categoryOf(compiler.uintptrType, op, compiler.uintptrSize);

  let valueExpression: binaryen.Expression | undefined;
  if (valueNode)
    valueExpression = compiler.maybeConvertValue(valueNode, compiler.compileExpression(valueNode, elementType), typescript.getReflectedType(valueNode), elementType, false);

  typescript.setReflectedType(node, elementType);

  // simplify / precalculate access to a constant index
  if (argumentNode.kind === typescript.SyntaxKind.NumericLiteral) {
    const literalNode = <typescript.LiteralExpression>argumentNode;
    const literalText = literalNode.text; // (usually) preprocessed by TypeScript to a base10 string

    if (literalText === "0")
      return compileLoadOrStore(compiler, node, elementType, expression, compiler.uintptrSize, valueExpression, contextualType);

    if (/^[1-9][0-9]*$/.test(literalText)) {
      const value = Long.fromString(literalText, true, 10);
      return compileLoadOrStore(compiler, node, elementType,
        uintptrCategory.add(
          expression,
          binaryen.valueOf(compiler.uintptrType, op, value.mul(elementType.size))
        ), compiler.uintptrSize, valueExpression, contextualType
      );
    }
  }

  // otherwise evaluate at runtime
  return compileLoadOrStore(compiler, node, elementType,
    uintptrCategory.add(
      expression,
      uintptrCategory.mul(
        argument,
        binaryen.valueOf(compiler.uintptrType, op, elementType.size)
      )
    ), compiler.uintptrSize, valueExpression, contextualType
  );
}

export { compileElementAccess as default };
