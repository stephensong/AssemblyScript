import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileNew(compiler: Compiler, node: typescript.NewExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, contextualType);

  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const identifierNode = <typescript.Identifier>node.expression;
    if (!contextualType.isClass) {
      compiler.error(node, "'new' used in non-class context");
      return op.unreachable();
    }

    const clazz = <reflection.Class>contextualType.underlyingClass;
    let typeArguments: reflection.Type[] = [];

    // If type arguments are provided, validate (TODO: accept sub-classes)
    if (node.typeArguments) {
      if (node.typeArguments.length !== clazz.typeParameterTypes.length) {
        compiler.error(node.typeArguments[0], "Type parameters mismatch", "Expected " + clazz.typeParameterTypes.length + " but found " + node.typeArguments.length);
        return op.unreachable();
      }
      for (let i = 0, k = node.typeArguments.length; i < k; ++i) {
        const typeArgument = compiler.resolveType(node.typeArguments[i]);
        if (typeArgument !== clazz.typeParameterTypes[i]) {
          compiler.error(node.typeArguments[i], "Type parameters mismatch", "Expected " + clazz.typeParameterTypes[i] + " but found " + node.typeArguments[i]);
          return op.unreachable();
        }
        typeArguments.push(typeArgument);
      }
    } else // otherwise inherit
      typeArguments = clazz.typeParameterTypes;

    // new Array<T>(size)
    if (identifierNode.text === "Array" && node.arguments && node.arguments.length === 1) {
      const arrayType = typeArguments[0];
      return compileNewArray(compiler, /* node, */ arrayType, <typescript.Expression>node.arguments[0]);
    }

    // new String(size)
    if (identifierNode.text === "String" && node.arguments && node.arguments.length === 1)
      return compileNewArray(compiler, /* node, */ reflection.ushortType, <typescript.Expression>node.arguments[0]);

    const reference = compiler.resolveReference(identifierNode);

    if (reference instanceof reflection.Class)
      return compileNewClass(compiler, node, <reflection.Class>reference);

    if (reference instanceof reflection.ClassTemplate) {
      const template = <reflection.ClassTemplate>reference;
      const instance = template.resolve(compiler, node.typeArguments || []);
      instance.initialize(compiler);
      return compileNewClass(compiler, node, instance);
    }
  }

  compiler.error(node, "Unsupported operation");
  return op.unreachable();
}

export function compileNewClass(compiler: Compiler, node: typescript.NewExpression, clazz: reflection.Class): binaryen.Expression {
  const op = compiler.module;
  const binaryenPtrType = binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize);

  // ptr = memset(malloc(classSize), 0, classSize)

  let ptr = op.call("memset", [
    op.call("malloc", [ // use wrapped malloc here so mspace_malloc can be inlined
      binaryen.valueOf(compiler.uintptrType, op, clazz.size)
    ], binaryenPtrType),
    op.i32.const(0), // 2nd memset argument is int
    binaryen.valueOf(compiler.uintptrType, op, clazz.size)
  ], binaryenPtrType);

  if (clazz.ctor) {

    // return ClassConstructor(ptr, arguments...)

    const parameterCount = clazz.ctor.parameters.length - 1;
    const argumentCount = node.arguments && node.arguments.length || 0;
    const args = new Array(parameterCount + 1);
    args[0] = ptr; // first constructor parameter is 'this'
    let i = 0;
    let tooFewDiagnosed = false;
    for (; i < parameterCount; ++i) {
      const parameter = clazz.ctor.parameters[i];
      if (argumentCount > i) {
        const argumentNode = (<typescript.NodeArray<typescript.Expression>>node.arguments)[i];
        args[i + 1] = compiler.maybeConvertValue(argumentNode, compiler.compileExpression(argumentNode, parameter.type), typescript.getReflectedType(argumentNode), parameter.type, false);
      } else { // TODO: use default value if defined
        if (!tooFewDiagnosed) {
          tooFewDiagnosed = true;
          compiler.error(node, "Too few arguments", "Expected " + parameterCount + " but saw " + argumentCount);
        }
        args[i + 1] = compiler.module.unreachable();
      }
    }
    if (argumentCount > i)
      compiler.error(node, "Too many arguments", "Expected " + parameterCount + " but saw " + argumentCount);
    ptr = op.call(clazz.ctor.name, args, binaryen.typeOf(clazz.ctor.returnType, compiler.uintptrSize));
  }

  return ptr;
}

export function compileNewArray(compiler: Compiler, /* node: typescript.NewExpression, */ elementType: reflection.Type, sizeArgumentNode: typescript.Expression) {
  const op = compiler.module;

  const sizeArgument = compiler.maybeConvertValue(sizeArgumentNode, compiler.compileExpression(sizeArgumentNode, compiler.uintptrType), typescript.getReflectedType(sizeArgumentNode), compiler.uintptrType, false);
  const uintptrCategory = binaryen.categoryOf(compiler.uintptrType, compiler.module, compiler.uintptrSize);
  const newsize = compiler.currentFunction.localsByName[".newsize"] || compiler.currentFunction.addLocal(".newsize", compiler.uintptrType);
  const newptr = compiler.currentFunction.localsByName[".newptr"] || compiler.currentFunction.addLocal(".newptr", compiler.uintptrType);
  const binaryenPtrType = binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize);

  // *(.newptr = memset(malloc(uintptrSize + size * (.newsize = EXPR)), 0, .newsize) = .newsize
  // return .newptr

  return op.block("", [
    uintptrCategory.store(
      0,
      compiler.uintptrType.size,
      op.teeLocal(newptr.index,
        op.call("memset", [
          op.call("malloc", [ // use wrapped malloc here so mspace_malloc can be inlined
            uintptrCategory.add(
              binaryen.valueOf(compiler.uintptrType, op, compiler.uintptrSize),
              uintptrCategory.mul(
                binaryen.valueOf(compiler.uintptrType, op, elementType.size),
                op.teeLocal(newsize.index, sizeArgument)
              )
            )
          ], binaryenPtrType),
          op.i32.const(0), // 2nd memset argument is int
          op.getLocal(newsize.index, binaryenPtrType)
        ], binaryenPtrType)
      ),
      op.getLocal(newsize.index, binaryenPtrType)
    ),
    op.getLocal(newptr.index, binaryenPtrType)
  ], binaryenPtrType);
}
