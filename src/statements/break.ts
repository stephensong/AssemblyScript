import { Compiler } from "../compiler";
import { binaryen } from "../wasm";

export function compileBreak(compiler: Compiler, node: ts.BreakStatement | ts.ContinueStatement): binaryen.Statement {
  const op = compiler.module;
  return op.break((node.kind === ts.SyntaxKind.ContinueStatement ? "continue$" : "break$") + compiler.currentBreakLabel);
}
