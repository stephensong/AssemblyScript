/** @module assemblyscript/expressions */ /** */

import * as binaryen from "binaryen";
import Compiler from "../compiler";
import compileNewArray from "./helpers/array";
import * as reflection from "../reflection";
import * as typescript from "../typescript";
import * as util from "../util";

/** Compiles an array literal expression. */
export function compileArrayLiteral(compiler: Compiler, node: typescript.ArrayLiteralExpression, contextualType: reflection.Type): binaryen.Expression {

  if (!contextualType.isArray)
    throw Error("array type expected"); // checked by typescript

  util.setReflectedType(node, contextualType);

  const arrayType = <reflection.Class>contextualType.underlyingClass;
  const elementType = arrayType.typeArgumentsMap.T.type;

  return compileNewArray(compiler, elementType, node.elements);
}
