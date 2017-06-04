import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileLoad(compiler: Compiler, node: typescript.Node, type: reflection.Type, ptr: binaryen.Expression, offset: number): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, type);

  switch (type) {

    case reflection.byteType:
      return op.i32.load8_u(offset, type.size, ptr);

    case reflection.sbyteType:
      return op.i32.load8_s(offset, type.size, ptr);

    case reflection.shortType:
      return op.i32.load16_s(offset, type.size, ptr);

    case reflection.ushortType:
      return op.i32.load16_u(offset, type.size, ptr);

    case reflection.intType:
    case reflection.uintType:
    case reflection.boolType:
    case reflection.uintptrType32:
      return op.i32.load(offset, type.size, ptr);

    case reflection.longType:
    case reflection.ulongType:
    case reflection.uintptrType64:
      return op.i64.load(offset, type.size, ptr);

  }
  throw Error("unexpected type");
}

export function compilePropertyAccess(compiler: Compiler, node: typescript.PropertyAccessExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  const propertyName = (<typescript.Identifier>node.name).text;

  // identifier.identifier
  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<typescript.Identifier>node.expression);

    if (reference instanceof reflection.Enum) {
      const enm = <reflection.Enum>reference;
      typescript.setReflectedType(node, reflection.intType);
      const property = enm.properties[propertyName];
      if (property.isConstant)
        return op.i32.const(<number>property.constantValue | 0); // todo: actual type

    } else if (reference instanceof reflection.Class) {
      const clazz = <reflection.Class>reference;
      const property = clazz.properties[propertyName];
      if (property && !property.isInstance) {
        if (property.isConstant)
          return op.i32.const(<number>property.constantValue | 0); // todo: actual type
        else {
          // TODO: this'd be a global
        }
      } else {
        compiler.error(node, "No such static property", "'" + propertyName + "' on " + clazz.toString());
        typescript.setReflectedType(node, contextualType);
        return op.unreachable();
      }

    } else if (reference instanceof reflection.Variable) {
      const variable = <reflection.Variable>reference;

      if (variable.type.isClass) {
        const clazz = <reflection.Class>variable.type.underlyingClass;
        const property = clazz.properties[propertyName];
        if (property && property.isInstance)
          return compileLoad(compiler, node, property.type, compiler.compileExpression(node.expression, property.type), property.offset);
        else {
          compiler.error(node, "No such instance property", "'" + propertyName + "' on " + clazz.toString());
          typescript.setReflectedType(node, contextualType);
          return op.unreachable();
        }
      }
    }
  }

  compiler.error(node, "Unsupported property access", typescript.SyntaxKind[node.expression.kind]);
  typescript.setReflectedType(node, contextualType);
  return op.unreachable();
}
