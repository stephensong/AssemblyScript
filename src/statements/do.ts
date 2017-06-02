import { Compiler } from "../compiler";
import { intType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";

/*
block {
  loop $continue {
    statement
    goto $continue if condition
  }
} $break
*/

export function compileDo(compiler: Compiler, node: ts.DoStatement): binaryen.Statement {
  const op = compiler.module;

  const context: binaryen.Statement[] = [];
  const loop: binaryen.Statement[] = [];
  const label = compiler.enterBreakContext();

  if (node.statement)
    loop.push(compiler.compileStatement(node.statement));

  loop.push(
    op.break("continue$" + label,
      compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), getWasmType(node.expression), intType, true)
    )
  );

  context.push(op.loop("continue$" + label, op.block("", loop)));
  compiler.leaveBreakContext();
  return op.block("break$" + label, context);
}
