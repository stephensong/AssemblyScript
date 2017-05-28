import { Compiler } from "../compiler";
import { intType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileWhile(compiler: Compiler, node: ts.WhileStatement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  const op = compiler.module;

  const context: binaryen.Statement[] = [];
  const loop: binaryen.Statement[] = [];
  const label = compiler.enterBreakContext();

  // TODO: This could also just be an if within a loop ending in a continue

  loop.push(
    op.break("break$" + label,
      op.i32.eqz(
        compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), getWasmType(node.expression), intType, true)
      )
    )
  );

  if (node.statement) {
    const stmt = compiler.compileStatement(node.statement, onVariable);
    if (stmt) {
      loop.push(stmt);
    }
  }

  loop.push(op.break("continue$" + label));

  context.push(op.loop("continue$" + label, op.block("", loop)));
  compiler.leaveBreakContext();
  return op.block("break$" + label, context);
}
