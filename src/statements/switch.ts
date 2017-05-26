import {
  Compiler
} from "../compiler";

import {
  WasmType,
  WasmStatement
} from "../wasm";

export function compileSwitch(compiler: Compiler, node: ts.SwitchStatement, onVariable: (node: ts.VariableDeclaration) => number): WasmStatement {
  const op = compiler.module;

  compiler.error(node, "Switch statements are not supported yet");
  return op.unreachable();
}

/*
  const stmt = <ts.SwitchStatement>node;
  const blocks: WasmStatement[] = new Array(stmt.caseBlock.clauses.length);
  const labels: string[] = new Array(blocks.length);
  let hasDefault = false;
  stmt.caseBlock.clauses.forEach((clause, i) => {
    let label: string;
    if (clause.kind == ts.SyntaxKind.DefaultClause) {
      if (hasDefault)
        compiler.error(clause, "A switch statement cannot have multiple default branches");
      hasDefault = true;
      label = "default";
    } else {
      label = "case" + i;
    }
    labels[i] = label;
    blocks[i] = op.block(label, clause.statements.map(stmt => compiler.compileStatement(stmt)));
  });
  return op.block("break", [
    op.switch(labels, hasDefault ? "default" : "break", compiler.compileExpression(stmt.expression, intType))
  ].concat(blocks));
*/
