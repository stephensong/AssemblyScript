import { Compiler } from "../compiler";
import { intType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

/*
block {
  loop $continue {
    if (condition) {
      statement
      goto $continue
    }
  }
} $break
*/

export function compileWhile(compiler: Compiler, node: ts.WhileStatement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  const op = compiler.module;

  const context: binaryen.Statement[] = [];
  const ifTrue: binaryen.Statement[] = [];
  const label = compiler.enterBreakContext();

  if (node.statement) {
    const stmt = compiler.compileStatement(node.statement, onVariable);
    if (stmt) {
      ifTrue.push(stmt);
    }
  }

  ifTrue.push(op.break("continue$" + label));

  context.push(
    op.loop("continue$" + label,
      op.if(
        compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), getWasmType(node.expression), intType, true),
        ifTrue.length === 1 ? ifTrue[0] : op.block("", ifTrue)
      )
    )
  );

  compiler.leaveBreakContext();
  return op.block("break$" + label, context);
}
