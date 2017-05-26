import { Compiler } from "../compiler";
import { binaryen } from "../wasm";

export function compileBreak(compiler: Compiler, isContinue: boolean = false): binaryen.Statement {
  const op = compiler.module;

  return op.break((isContinue ? "continue$" : "break$") + compiler.currentBreakLabel);
}
