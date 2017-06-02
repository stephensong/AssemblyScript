import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { uintType } from "../types";
import { binaryenCategoryOf, binaryenTypeOf, binaryenValueOf, getWasmType, setWasmType } from "../util";
import * as wasm from "../wasm";

export function compileNewArray(compiler: Compiler, node: ts.NewExpression, contextualType: wasm.Type) {
  const op = compiler.module;

  if (node.arguments && node.arguments.length === 1 && node.typeArguments && node.typeArguments.length === 1) {
    const sizeArgument = <ts.Expression>node.arguments[0];
    const sizeExpression = compiler.maybeConvertValue(sizeArgument, compiler.compileExpression(sizeArgument, compiler.uintptrType), getWasmType(sizeArgument), compiler.uintptrType, false);
    const elementType = compiler.resolveType(<ts.TypeNode>node.typeArguments[0]);

    const cat = binaryenCategoryOf(compiler.uintptrType, compiler.module, compiler.uintptrSize);

    const newsize = compiler.currentLocals[".newsize"] ? compiler.currentLocals[".newsize"].index : compiler.onVariable(".newsize", uintType);
    const newptr = compiler.currentLocals[".newptr"] ? compiler.currentLocals[".newptr"].index : compiler.onVariable(".newptr", compiler.uintptrType);

    // *(newptr = malloc(4 + elementSize * (newsize = EXPR))) = newsize
    // return newptr

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
          ], binaryenTypeOf(compiler.uintptrType, compiler.uintptrSize))
        ),
        op.getLocal(newsize, binaryenTypeOf(uintType, compiler.uintptrSize))
      ),
      op.getLocal(newptr, binaryenTypeOf(compiler.uintptrType, compiler.uintptrSize))
    ], binaryenTypeOf(compiler.uintptrType, compiler.uintptrSize));
  }

  compiler.error(node, "Unsupported operation");
  return op.unreachable();
}

export function compileNew(compiler: Compiler, node: ts.NewExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  setWasmType(node, compiler.uintptrType);

  if (node.expression.kind === ts.SyntaxKind.Identifier)
    if ((<ts.Identifier>node.expression).text === "Array")
      return compileNewArray(compiler, node, contextualType);

  compiler.error(node, "New is not supported yet");
  return op.unreachable();
}
