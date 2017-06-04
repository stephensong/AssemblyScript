import * as binaryen from "../binaryen";
import Compiler from "../compiler";

export function compileEmpty(compiler: Compiler/*, node: ts.EmptyStatement*/): binaryen.Statement {
  const op = compiler.module;

  return op.nop();
}
