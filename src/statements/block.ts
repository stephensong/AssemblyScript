import * as binaryen from "../binaryen";
import Compiler from "../compiler";

export function compileBlock(compiler: Compiler, node: ts.Block): binaryen.Statement {
  const op = compiler.module;

  const statements: binaryen.Statement[] = new Array(node.statements.length);
  let i = 0;
  for (const k = statements.length; i < k; ++i)
    statements[i] = compiler.compileStatement(node.statements[i]);

  if (i === 0)
    return op.nop();
  if (i === 1)
    return statements[0];

  statements.length = i;
  return op.block("", statements);
}
