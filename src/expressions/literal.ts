import * as binaryen from "../binaryen";
import Compiler from "../compiler";
import * as Long from "long";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

export function compileLiteral(compiler: Compiler, node: typescript.LiteralExpression, contextualType: reflection.Type): binaryen.Expression {
  const op = compiler.module;

  let text = node.text;
  switch (text) {

    case "true":
      typescript.setReflectedType(node, reflection.boolType);
      return contextualType.isLong ? op.i64.const(1, 0) : op.i32.const(1);

    case "false":
      typescript.setReflectedType(node, reflection.boolType);
      return contextualType.isLong ? op.i64.const(0, 0) : op.i32.const(0);

    case "null":
      typescript.setReflectedType(node, compiler.uintptrType);
      return compiler.uintptrSize === 4 ? op.i32.const(0) : op.i64.const(0, 0);

  }
  typescript.setReflectedType(node, contextualType);

  if (contextualType.isAnyFloat) {

    let floatValue: number;

    if (/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/.test(text)) {
      floatValue = parseFloat(text);
    } else {
      floatValue = 0;
      compiler.error(node, "Illegal float literal", text);
    }

    return contextualType === reflection.floatType
      ? op.f32.const(floatValue)
      : op.f64.const(floatValue);

  } else if (contextualType.isAnyInteger) {

    let intValue: number;
    let intRadix: number;

    if (/^(?:0|[1-9][0-9]*)$/.test(text)) {
      intValue = parseInt(text, intRadix = 10);
    } else if (/^0[xX][0-9A-Fa-f]+$/.test(text)) {
      intValue = parseInt(text = text.substring(2), intRadix = 16);
    } else {
      intValue = 0; intRadix = 10; text = "0";
      compiler.error(node, "Illegal integer literal", text);
    }

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
        const long = Long.fromString(text, !contextualType.isSigned, intRadix);
        return op.i64.const(long.low, long.high);

    }
  }
  compiler.error(node, "Unsupported literal", "'" + text + "' in " + reflection.TypeKind[contextualType.kind] + " context");
  return op.unreachable();
}
