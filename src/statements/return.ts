/** @module assemblyscript/statements */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileReturn(compiler: Compiler, node: typescript.ReturnStatement): binaryen.Statement {
  const op = compiler.module;

  if (compiler.currentFunction.returnType === reflection.voidType) {

    if (!node.expression)
      return op.return();

    compiler.error(node, "Function cannot return a value", "Return type is 'void'");

  } else {

    if (node.expression) {

      const expressionNode = <typescript.Expression>node.expression;
      let expression = compiler.compileExpression(expressionNode, compiler.currentFunction.returnType);
      expression = compiler.maybeConvertValue(
        expressionNode,
        expression,
        typescript.getReflectedType(expressionNode),
        compiler.currentFunction.returnType,
        false
      );

      return op.return(expression);
    }

    compiler.error(node, "Function must return a value");
  }

  return op.unreachable();
}
