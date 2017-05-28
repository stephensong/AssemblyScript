import { Compiler } from "../compiler";
import { intType, voidType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

import { compileVariableDeclarationList } from "./variable";

export function compileFor(compiler: Compiler, node: ts.ForStatement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  const op = compiler.module;

  const context: binaryen.Statement[] = [];
  const loop: binaryen.Statement[] = [];
  const label = compiler.enterBreakContext();

  // for (INITIALIZER; ...; ...)
  if (node.initializer) {
    if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {

      context.push(compileVariableDeclarationList(compiler, <ts.VariableDeclarationList>node.initializer, onVariable));

    } else { // Expression

      const expr = compiler.compileExpression(<ts.Expression>node.initializer, voidType);
      if (getWasmType(node.initializer) === voidType)
        context.push(expr);
      else
        context.push(op.drop(expr));
    }
  }

  // for (...; CONDITION; ...)
  loop.push(
    op.break("break$" + label,
      op.i32.eqz(
        compiler.maybeConvertValue(node.condition, compiler.compileExpression(node.condition, intType), getWasmType(node.condition), intType, true)
      )
    )
  );

   // for (...) { BODY }
  if (node.statement) {
    const stmt = compiler.compileStatement(node.statement, onVariable);
    if (stmt)
      loop.push(stmt);
  }

  // for (...; ...; INCREMENTOR)
  if (node.incrementor) {
    const expr = compiler.compileExpression(node.incrementor, voidType);
    if (getWasmType(node.incrementor) === voidType)
      loop.push(expr);
    else
      loop.push(op.drop(expr));
  }

  loop.push(
    op.break(/* explicit */ "continue$" + label)
  );

  context.push(op.loop("continue$" + label, op.block("", loop)));
  compiler.leaveBreakContext();
  return op.block("break$" + label, context);
}
