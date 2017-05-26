import {
  Compiler
} from "../compiler";

import {
  WasmStatement
} from "../wasm";

export function compileBreak(compiler: Compiler, isContinue: boolean = false): WasmStatement {
  const op = compiler.module;

  return op.break((isContinue ? "continue$" : "break$") + compiler.currentBreakLabel);
}
