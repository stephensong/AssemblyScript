import {
  Compiler
} from "../compiler";

import {
  WasmStatement
} from "../wasm";

export function compileBlock(compiler: Compiler, node: ts.Block, onVariable: (node: ts.VariableDeclaration) => number): WasmStatement {
  const op = compiler.module;

  const statements: WasmStatement[] = new Array(node.statements.length);
  let i = 0;
  for (const k = statements.length; i < k; ++i)
    statements[i] = compiler.compileStatement(node.statements[i], onVariable);

  if (i === 0)
    return null;
  if (i === 1)
    return statements[0];

  statements.length = i;
  return op.block("", statements);
}
