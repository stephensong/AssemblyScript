import { Compiler } from "../compiler";
import { binaryen } from "../wasm";

export function compileEmpty(compiler: Compiler/*, node: ts.EmptyStatement*/): binaryen.Statement {
  const op = compiler.module;
  return op.nop();
}
