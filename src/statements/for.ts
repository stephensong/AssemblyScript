import { Compiler } from "../compiler";
import { intType, voidType } from "../types";
import { getWasmType } from "../util";
import { compileVariableDeclarationList } from "./variable";
import { binaryen } from "../wasm";

/*
block {
  initializer
  loop $continue {
    if (condition) {
      statement
      incrementor
      goto $continue
    }
  }
} $break
*/

export function compileFor(compiler: Compiler, node: ts.ForStatement): binaryen.Statement {
  const op = compiler.module;

  const context: binaryen.Statement[] = [];
  const ifTrue: binaryen.Statement[] = [];
  const label = compiler.enterBreakContext();

  if (node.initializer) {
    if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {

      context.push(compileVariableDeclarationList(compiler, <ts.VariableDeclarationList>node.initializer));

    } else /* ts.Expression */ {

      const expr = compiler.compileExpression(<ts.Expression>node.initializer, voidType);
      if (getWasmType(node.initializer) === voidType)
        context.push(expr);
      else
        context.push(op.drop(expr));
    }
  }

  if (node.statement)
    ifTrue.push(compiler.compileStatement(node.statement));

  if (node.incrementor) {
    const expr = compiler.compileExpression(node.incrementor, voidType);
    if (getWasmType(node.incrementor) === voidType)
      ifTrue.push(expr);
    else
      ifTrue.push(op.drop(expr));
  }

  ifTrue.push(op.break("continue$" + label));

  if (node.condition) {

    context.push(
      op.loop("continue$" + label,
        op.if(
          compiler.maybeConvertValue(node.condition, compiler.compileExpression(node.condition, intType), getWasmType(node.condition), intType, true),
          ifTrue.length === 1 ? ifTrue[0] : op.block("", ifTrue)
        )
      )
    );

  } else {

    if (ifTrue.length === 1) // binaryen errors here
      compiler.error(node, "Illegal endless loop");

    context.push(
      op.loop("continue$" + label,
        ifTrue.length === 1 ? ifTrue[0] : op.block("", ifTrue)
      )
    );

  }

  compiler.leaveBreakContext();
  return op.block("break$" + label, context);
}
