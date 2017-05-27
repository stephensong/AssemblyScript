import { Compiler } from "../compiler";
import * as Long from "long";
import { byteType, sbyteType, shortType, ushortType, intType, uintType, longType, ulongType, uintptrType32, uintptrType64, boolType, floatType, doubleType } from "../types";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileLiteral(compiler: Compiler, node: ts.LiteralExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  let text = node.text;

  switch (text) {

    case "true":
      setWasmType(node, boolType);
      return contextualType.isLong ? op.i64.const(1, 0) : op.i32.const(1);

    case "false":
      setWasmType(node, boolType);
      return contextualType.isLong ? op.i64.const(0, 0) : op.i32.const(0);

    case "null":
      setWasmType(node, compiler.uintptrType);
      return compiler.uintptrSize === 4 ? op.i32.const(0) : op.i64.const(0, 0);

  }

  if (contextualType.isAnyFloat) {

    let floatValue: number;

    if (/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/.test(text)) {
      floatValue = parseFloat(text);
    } else {
      floatValue = 0;
      compiler.error(node, "Float literal expected", text);
    }

    setWasmType(node, contextualType);
    return contextualType === floatType ? op.f32.const(floatValue) : op.f64.const(floatValue);

  } else if (contextualType.isAnyInteger) {

    let intValue: number;
    let intRadix: number;

    if (/^(?:0|[1-9][0-9]*)$/.test(text)) {
      intValue = parseInt(text, intRadix = 10);
    } else if (/^0[xX][0-9A-Fa-f]+$/.test(text)) {
      intValue = parseInt(text = text.substring(2), intRadix = 16);
    } else {
      intValue = 0; intRadix = 10; text = "0";
      compiler.error(node, "Integer literal expected", text);
    }

    setWasmType(node, contextualType);

    switch (contextualType) {

      case sbyteType:
      case shortType:
        return op.i32.const(((intValue >>> 0) << contextualType.shift32) >> contextualType.shift32);

      case byteType:
      case ushortType:
        return op.i32.const(intValue & contextualType.mask32);

      case intType:
      case uintType:
      case uintptrType32:
        return op.i32.const(intValue);

      case boolType:
        return op.i32.const(intValue ? 1 : 0);

      case longType:
      case ulongType:
      case uintptrType64:
        const long = Long.fromString(text, !contextualType.isSigned, intRadix);
        return op.i64.const(long.low, long.high);

    }

  }

  compiler.error(node, "Unsupported literal", text);
  return op.unreachable();
}
