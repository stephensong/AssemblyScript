/** @module assemblyscript/expressions */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileParenthesized(compiler: Compiler, node: typescript.ParenthesizedExpression, contextualType: reflection.Type): binaryen.Expression {
  const expression = compiler.compileExpression(node.expression, contextualType);

  typescript.setReflectedType(node, typescript.getReflectedType(node.expression));
  return expression;
}
