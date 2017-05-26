import {
  Compiler
} from "../compiler";

import {
  WasmStatement
} from "../wasm";

export function compileBlock(compiler: Compiler, node: ts.Block, onVariable: (node: ts.VariableDeclaration) => number): WasmStatement {
  const op = compiler.module;

  if (node.statements.length === 0)
    return null;

  else if (node.statements.length === 1)
    return compiler.compileStatement(node.statements[0], onVariable);

  const statements: WasmStatement[] = new Array(node.statements.length);
  for (let i = 0, k = statements.length; i < k; ++i)
    statements[i] = compiler.compileStatement(node.statements[i], onVariable);

  return op.block("", statements);
}
