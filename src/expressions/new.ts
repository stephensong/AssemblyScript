import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileNew(compiler: Compiler, node: typescript.NewExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, compiler.uintptrType);

  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const identifierNode = <typescript.Identifier>node.expression;

    // TODO: These are hard-coded but should go through compileNewClass -> compileNewArray eventually

    // new Array<T>(size)
    if (identifierNode.text === "Array" && node.arguments && node.arguments.length === 1 && node.typeArguments && node.typeArguments.length === 1)
      return compileNewArray(compiler, node, compiler.resolveType(node.typeArguments[0]), <typescript.Expression>node.arguments[0]);

    // new String(size)
    if (identifierNode.text === "String" && node.arguments && node.arguments.length === 1 && !node.typeArguments)
      return compileNewArray(compiler, node, reflection.ushortType, <typescript.Expression>node.arguments[0]);

    const reference = compiler.resolveReference(identifierNode);
    if (reference instanceof reflection.Class) {
      return compileNewClass(compiler, node, <reflection.Class>reference);
    }
  }

  compiler.error(node, "Unsupported operation");
  return op.unreachable();
}

export function compileNewClass(compiler: Compiler, node: typescript.NewExpression, clazz: reflection.Class): binaryen.Expression {
  const op = compiler.module;
  const binaryenPtrType = binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize);

  // return malloc(classSize)

  return op.block("", [
    op.call("malloc", [ // use wrapped malloc here so mspace_malloc can be inlined
      binaryen.valueOf(compiler.uintptrType, op, clazz.size)
    ], binaryenPtrType)
  ], binaryenPtrType);

  // TODO: call constructor, if any
}

export function compileNewArray(compiler: Compiler, node: typescript.NewExpression, elementType: reflection.Type, sizeArgument: typescript.Expression) {
  const op = compiler.module;

  const sizeExpression = compiler.maybeConvertValue(sizeArgument, compiler.compileExpression(sizeArgument, compiler.uintptrType), typescript.getReflectedType(sizeArgument), compiler.uintptrType, false);
  const cat = binaryen.categoryOf(compiler.uintptrType, compiler.module, compiler.uintptrSize);
  const newsize = compiler.currentLocals[".newsize"] ? compiler.currentLocals[".newsize"].index : compiler.onVariable(".newsize", reflection.uintType);
  const newptr = compiler.currentLocals[".newptr"] ? compiler.currentLocals[".newptr"].index : compiler.onVariable(".newptr", compiler.uintptrType);
  const binaryenPtrType = binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize);

  // *(.newptr = malloc(4 + size * (.newsize = EXPR))) = .newsize
  // return .newptr

  return op.block("", [
    cat.store(
      0,
      compiler.uintptrType.size,
      op.teeLocal(newptr,
        op.call("malloc", [ // use wrapped malloc here so mspace_malloc can be inlined
          cat.add(
            binaryen.valueOf(compiler.uintptrType, op, 4),
            cat.mul(
              binaryen.valueOf(compiler.uintptrType, op, elementType.size),
              op.teeLocal(newsize, sizeExpression)
            )
          )
        ], binaryenPtrType)
      ),
      op.getLocal(newsize, binaryen.typeOf(reflection.uintType, compiler.uintptrSize))
    ),
    op.getLocal(newptr, binaryenPtrType)
  ], binaryenPtrType);
}

// TODO: String (an ushort array basically)
