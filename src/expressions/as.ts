import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileAs(compiler: Compiler, node: typescript.AsExpression, contextualType: reflection.Type): binaryen.Expression {
  const toType = compiler.currentFunction && compiler.currentFunction.typeParameters[typescript.getTextOfNode(node.type)] || compiler.resolveType(node.type);

  typescript.setReflectedType(node, toType);
  return compiler.maybeConvertValue(node, compiler.compileExpression(node.expression, contextualType), typescript.getReflectedType(node.expression), toType, true);
}
