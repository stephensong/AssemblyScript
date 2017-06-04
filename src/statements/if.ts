import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileIf(compiler: Compiler, node: typescript.IfStatement): binaryen.Statement {
  const op = compiler.module;

  return op.if(
    compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, reflection.intType), typescript.getReflectedType(node.expression), reflection.intType, true),
    compiler.compileStatement(node.thenStatement),
    node.elseStatement ? compiler.compileStatement(node.elseStatement) : undefined
  );
}
