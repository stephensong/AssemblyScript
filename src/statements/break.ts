/** @module assemblyscript/statements */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as typescript from "../typescript";

export function compileBreak(compiler: Compiler, node: typescript.BreakStatement | typescript.ContinueStatement): binaryen.Statement {
  const op = compiler.module;

  return op.break(
    (node.kind === typescript.SyntaxKind.ContinueStatement
      ? "continue$"
      : "break$"
    ) + compiler.currentBreakLabel
  );
}
