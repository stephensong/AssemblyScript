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

      const expression = <typescript.Expression>node.expression;

      return op.return(
        compiler.maybeConvertValue(
          expression,
          compiler.compileExpression(expression, compiler.currentFunction.returnType),
          typescript.getReflectedType(expression),
          compiler.currentFunction.returnType,
          false
        )
      );
    }

    compiler.error(node, "Function must return a value");
  }

  return op.unreachable();
}
