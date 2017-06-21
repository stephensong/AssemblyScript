/** @module assemblyscript/expressions */ /** */

import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as Long from "long";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileLiteral(compiler: Compiler, node: typescript.LiteralExpression, contextualType: reflection.Type, negate: boolean = false): binaryen.Expression {
  const op = compiler.module;

  switch (node.kind) {
    case typescript.SyntaxKind.TrueKeyword:
      negate = !negate;

    case typescript.SyntaxKind.FalseKeyword:
      typescript.setReflectedType(node, reflection.boolType);
      return negate
        ? contextualType.isLong ? op.i64.const(1, 0) : op.i32.const(1)
        : contextualType.isLong ? op.i64.const(0, 0) : op.i32.const(0);

    case typescript.SyntaxKind.NullKeyword:
      typescript.setReflectedType(node, compiler.uintptrType);
      return compiler.uintptrSize === 4 ? op.i32.const(0) : op.i64.const(0, 0);

    case typescript.SyntaxKind.NumericLiteral:
    {
      typescript.setReflectedType(node, contextualType);

      let text = node.text;
      let intValue: number;
      let intRadix: number = 10;

      if (/^(?:0|[1-9][0-9]*)$/.test(text))
        intValue = parseInt(text, intRadix = 10);
      else if (/^0[xX][0-9A-Fa-f]+$/.test(text))
        intValue = parseInt(text = text.substring(2), intRadix = 16);
      else {
        let floatValue: number;

        if (/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/.test(text)) {
          floatValue = parseFloat(text);
          if (negate)
            floatValue = -floatValue;

          if (contextualType === reflection.floatType)
            return op.f32.const(floatValue);
          else {
            typescript.setReflectedType(node, reflection.doubleType);
            return op.f64.const(floatValue);
          }
        } else {
          compiler.error(node, "Unsupported numeric literal", "'" + text + "' in " + reflection.TypeKind[contextualType.kind] + " context");
          return op.unreachable();
        }
      }

      if (negate)
        intValue = -intValue;

      switch (contextualType) {

        case reflection.sbyteType:
        case reflection.shortType:
          return op.i32.const(((intValue >>> 0) << <number>contextualType.shift32) >> <number>contextualType.shift32);

        case reflection.byteType:
        case reflection.ushortType:
          return op.i32.const(intValue & <number>contextualType.mask32);

        case reflection.intType:
        case reflection.uintType:
        case reflection.uintptrType32:
          return op.i32.const(intValue);

        case reflection.boolType:
          return op.i32.const(intValue ? 1 : 0);

        case reflection.longType:
        case reflection.ulongType:
        case reflection.uintptrType64:
          let long = Long.fromString(text, !contextualType.isSigned, intRadix);
          if (negate)
            long = long.negate();
          return op.i64.const(long.low, long.high);

        case reflection.floatType:
          return op.f32.const(intValue);

        case reflection.doubleType:
          return op.f64.const(intValue);
      }
      throw Error("unexpected type");
    }

    case typescript.SyntaxKind.StringLiteral:
    {
      const text = node.text;
      const offset = compiler.createStaticString(text);
      return binaryen.valueOf(compiler.uintptrType, op, offset);
    }
  }

  typescript.setReflectedType(node, contextualType);
  compiler.error(node, "Unsupported literal", "'" + node.text + "' in " + reflection.TypeKind[contextualType.kind] + " context");
  return op.unreachable();
}

export { compileLiteral as default };
