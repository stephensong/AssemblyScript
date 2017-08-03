/** @module assemblyscript/expressions */ /** */

import * as binaryen from "binaryen";
import Compiler from "../../compiler";
import compileStore from "./store";
import * as reflection from "../../reflection";
import * as typescript from "../../typescript";

export function compileNewArray(compiler: Compiler, elementType: reflection.Type, elementsOrSize: typescript.Expression[] | number): binaryen.Expression {
  const op = compiler.module;
  const arrayHeaderSize = 2 * reflection.intType.size;
  const elementCount = typeof elementsOrSize === "number" ? elementsOrSize : elementsOrSize.length;
  const arrptr = compiler.currentFunction.addUniqueLocal(compiler.uintptrType, "arrptr");
  const binaryenUintptrType = compiler.typeOf(compiler.uintptrType);
  const binaryenElementSize = compiler.valueOf(reflection.intType, elementCount);

  // initialize header
  const block = [
    op.setLocal(
      arrptr.index,
      compiler.compileMallocInvocation(arrayHeaderSize + elementCount * elementType.size) // capacity + length + N * element
    ),
    op.i32.store(0, 4, op.getLocal(arrptr.index, binaryenUintptrType), binaryenElementSize), // capacity
    op.i32.store(4, 4, op.getLocal(arrptr.index, binaryenUintptrType), binaryenElementSize)  // length
  ];

  // initialize concrete values if specified
  if (Array.isArray(elementsOrSize))
    for (let i = 0; i < elementCount; ++i)
      block.push(
        compileStore(compiler, elementsOrSize[i], elementType,
          op.getLocal(arrptr.index, binaryenUintptrType),
          arrayHeaderSize + i * elementType.size,
          compiler.compileExpression(elementsOrSize[i], elementType, elementType)
        )
      );

  // return the pointer
  block.push(
    op.getLocal(arrptr.index, binaryenUintptrType)
  );

  return op.block("", block, binaryenUintptrType);
}

export { compileNewArray as default };
