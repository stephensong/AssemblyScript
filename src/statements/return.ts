import { Compiler } from "../compiler";
import { voidType } from "../types";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileReturn(compiler: Compiler, node: ts.ReturnStatement): binaryen.Statement {
  const op = compiler.module;

  if (compiler.currentFunction.returnType === voidType) {

    if (!node.expression)
      return op.return();

    compiler.error(node, "A function without a return type cannot return a value", compiler.currentFunction.name);

  } else {

    if (node.expression) {

      const expression = <ts.Expression>node.expression;

      return op.return(
        compiler.maybeConvertValue(
          expression,
          compiler.compileExpression(expression, compiler.currentFunction.returnType),
          <wasm.Type>(<any>expression).wasmType,
          compiler.currentFunction.returnType,
          false
        )
      );
    }

    compiler.error(node, "A function with a return type must return a value", compiler.currentFunction.name);
  }

  return op.unreachable();
}
