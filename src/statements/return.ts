import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { voidType } from "../types";
import { getWasmType } from "../util";

export function compileReturn(compiler: Compiler, node: ts.ReturnStatement): binaryen.Statement {
  const op = compiler.module;

  if (compiler.currentFunction.returnType === voidType) {

    if (!node.expression)
      return op.return();

    compiler.error(node, "Function cannot return a value", "Return type is 'void'");

  } else {

    if (node.expression) {

      const expression = <ts.Expression>node.expression;

      return op.return(
        compiler.maybeConvertValue(
          expression,
          compiler.compileExpression(expression, compiler.currentFunction.returnType),
          getWasmType(expression),
          compiler.currentFunction.returnType,
          false
        )
      );
    }

    compiler.error(node, "Function must return a value");
  }

  return op.unreachable();
}
