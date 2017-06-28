/** @module assemblyscript/expressions */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import compileLoad from "./helpers/load";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compilePropertyAccess(compiler: Compiler, node: typescript.PropertyAccessExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, contextualType);

  const propertyName = typescript.getTextOfNode(node.name);

  // TODO: see elementaccess.ts for possible improvements

  // this.identifier
  if (node.expression.kind === typescript.SyntaxKind.ThisKeyword) {
    const clazz = compiler.currentFunction && compiler.currentFunction.parent || null;
    if (clazz) {
      const property = clazz.properties[propertyName];
      if (property) {
        typescript.setReflectedType(node, property.type);
        return compileLoad(compiler, node, property.type, op.getLocal(0, binaryen.typeOf(compiler.uintptrType, compiler.uintptrSize)), property.offset);
      } else {
        compiler.error(node, "No such instance property", "'" + propertyName + "' on " + clazz.name);
        typescript.setReflectedType(node, contextualType);
        return op.unreachable();
      }
    } else {
      compiler.error(node, "'this' keyword used in non-instance context");
      typescript.setReflectedType(node, contextualType);
      return op.unreachable();
    }
  }

  // identifier.identifier
  if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<typescript.Identifier>node.expression);

    if (reference instanceof reflection.Enum) {
      const enm = <reflection.Enum>reference;
      typescript.setReflectedType(node, reflection.intType);
      const property = enm.values[propertyName];
      if (property.isConstant)
        return op.i32.const(<number>property.constantValue | 0); // todo: actual type

    } else if (reference instanceof reflection.Class) {
      const clazz = <reflection.Class>reference;
      const property = clazz.properties[propertyName];
      if (property && !property.isInstance) {
        if (property.isConstant)
          return op.i32.const(<number>property.constantValue | 0); // todo: actual type
        else {
          // const global = compiler.globals[clazz.name + "." + propertyName];
          // TODO: a static property is a global
        }
      } else {
        compiler.error(node, "No such static property", "'" + propertyName + "' on " + clazz.name);
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
          compiler.error(node, "No such instance property", "'" + propertyName + "' on " + clazz.name);
          typescript.setReflectedType(node, contextualType);
          return op.unreachable();
        }
      }
    }
  }

  compiler.error(node, "Unsupported property access", "SyntaxKind " + node.expression.kind);
  typescript.setReflectedType(node, contextualType);
  return op.unreachable();
}
