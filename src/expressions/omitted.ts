/** @module assemblyscript/expressions */ /** */

import * as binaryen from "binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

/** Compiles an omitted expression. */
export function compileOmitted(compiler: Compiler, node: typescript.OmittedExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;
  const parent = <typescript.Node>node.parent;

  // omitted expression in array literal
  if (parent.kind === typescript.SyntaxKind.ArrayLiteralExpression)
    return compiler.valueOf(contextualType, 0);

  compiler.report(node, typescript.DiagnosticsEx.Unsupported_node_kind_0_in_1, parent.kind, "expressions/compileOmitted");
  return op.unreachable();
}

export { compileOmitted as default };
