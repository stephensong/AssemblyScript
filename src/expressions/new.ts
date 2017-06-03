import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { ushortType, uintType } from "../types";
import { binaryenCategoryOf, binaryenTypeOf, binaryenValueOf, getWasmType, setWasmType } from "../util";
import * as wasm from "../wasm";

export function compileNew(compiler: Compiler, node: ts.NewExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  setWasmType(node, compiler.uintptrType);

  if (node.expression.kind === ts.SyntaxKind.Identifier) {
    const identifierNode = <ts.Identifier>node.expression;

    // TODO: These are hard-coded but should go through compileNewClass -> compileNewArray eventually

    // new Array<T>(size)
    if (identifierNode.text === "Array" && node.arguments && node.arguments.length === 1 && node.typeArguments && node.typeArguments.length === 1)
      return compileNewArray(compiler, node, compiler.resolveType(node.typeArguments[0]), <ts.Expression>node.arguments[0]);

    // new String(size)
    if (identifierNode.text === "String" && node.arguments && node.arguments.length === 1 && !node.typeArguments)
      return compileNewArray(compiler, node, ushortType, <ts.Expression>node.arguments[0]);

    const reference = compiler.resolveReference(identifierNode);
    if (reference) {
      switch (reference.kind) {

        // new Class<?>(...)
        case wasm.ReflectionObjectKind.Class:
          return compileNewClass(compiler, node, <wasm.Class>reference);

      }
    }
  }

  compiler.error(node, "Unsupported operation");
  return op.unreachable();
}

export function compileNewClass(compiler: Compiler, node: ts.NewExpression, clazz: wasm.Class): binaryen.Expression {
  const op = compiler.module;
  const binaryenPtrType = binaryenTypeOf(compiler.uintptrType, compiler.uintptrSize);

  // return malloc(classSize)

  return op.block("", [
    op.call("malloc", [
      binaryenValueOf(compiler.uintptrType, op, clazz.size)
    ], binaryenPtrType)
  ], binaryenPtrType);

  // TODO: call constructor, if any
}

export function compileNewArray(compiler: Compiler, node: ts.NewExpression, elementType: wasm.Type, sizeArgument: ts.Expression) {
  const op = compiler.module;

  const sizeExpression = compiler.maybeConvertValue(sizeArgument, compiler.compileExpression(sizeArgument, compiler.uintptrType), getWasmType(sizeArgument), compiler.uintptrType, false);
  const cat = binaryenCategoryOf(compiler.uintptrType, compiler.module, compiler.uintptrSize);
  const newsize = compiler.currentLocals[".newsize"] ? compiler.currentLocals[".newsize"].index : compiler.onVariable(".newsize", uintType);
  const newptr = compiler.currentLocals[".newptr"] ? compiler.currentLocals[".newptr"].index : compiler.onVariable(".newptr", compiler.uintptrType);
  const binaryenPtrType = binaryenTypeOf(compiler.uintptrType, compiler.uintptrSize);

  // *(.newptr = malloc(4 + size * (.newsize = EXPR))) = .newsize
  // return .newptr

  return op.block("", [
    cat.store(
      0,
      compiler.uintptrType.size,
      op.teeLocal(newptr,
        op.call("malloc", [
          cat.add(
            binaryenValueOf(compiler.uintptrType, op, 4),
            cat.mul(
              binaryenValueOf(compiler.uintptrType, op, elementType.size),
              op.teeLocal(newsize, sizeExpression)
            )
          )
        ], binaryenPtrType)
      ),
      op.getLocal(newsize, binaryenTypeOf(uintType, compiler.uintptrSize))
    ),
    op.getLocal(newptr, binaryenPtrType)
  ], binaryenPtrType);
}

// TODO: String (an ushort array basically)
