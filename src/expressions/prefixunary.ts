import { Compiler } from "../compiler";
import { intType, boolType, floatType, doubleType } from "../types";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compilePrefixUnary(compiler: Compiler, node: ts.PrefixUnaryExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  const operand = compiler.compileExpression(node.operand, contextualType);
  const operandType = <wasm.Type>(<any>node.operand).wasmType;

  switch (node.operator) {

    case ts.SyntaxKind.ExclamationToken:
    {
      (<any>node).wasmType = boolType;

      if (operandType === floatType)
        return op.f32.eq(operand, op.f32.const(0));

      else if (operandType === doubleType)
        return op.f64.eq(operand, op.f64.const(0));

      else if (operandType.isLong)
        return op.i64.eqz(operand);

      else
        return op.i32.eqz(operand);
    }

    case ts.SyntaxKind.PlusToken: // noop
    {
      (<any>node).wasmType = operandType;

      return operand;
    }

    case ts.SyntaxKind.MinusToken:
    {
      (<any>node).wasmType = operandType;

      if (operandType === floatType)
        return op.f32.neg(node.operand);

      else if (operandType === doubleType)
        return op.f64.neg(node.operand);

      else if (operandType.isLong)
        return op.i64.sub(op.i64.const(0, 0), operand);

      else // FIXME: negated constant literals result in sub(const.0, const.value)
        return compiler.maybeConvertValue(node, op.i32.sub(op.i32.const(0), operand), intType, operandType, true);
    }

    case ts.SyntaxKind.TildeToken:
    {
      if (operandType.isLong) {

        (<any>node).wasmType = operandType;
        return op.i64.xor(operand, op.i64.const(-1, -1));

      } else if (operandType.isInt) {

        (<any>node).wasmType = operandType;
        return op.i32.xor(operand, op.i32.const(-1));

      } else if (contextualType.isLong) { // TODO: is the following correct / doesn't generate useless ops?

        (<any>node).wasmType = contextualType;
        return op.i64.xor(compiler.maybeConvertValue(node.operand, operand, operandType, contextualType, true), op.i64.const(-1, -1));

      } else {

        (<any>node).wasmType = intType;
        return op.i32.xor(compiler.maybeConvertValue(node.operand, operand, operandType, intType, true), op.i32.const(-1));

      }
    }

    case ts.SyntaxKind.PlusPlusToken:
    case ts.SyntaxKind.MinusMinusToken:
    {
      if (node.operand.kind === ts.SyntaxKind.Identifier) {

        const local = compiler.currentLocals[(<ts.Identifier>node.operand).text];
        if (local) {

          const cat = compiler.categoryOf(local.type);
          const one = compiler.oneOf(local.type);
          const isIncrement = node.operator === ts.SyntaxKind.PlusPlusToken;

          const calculate = (isIncrement ? cat.add : cat.sub).call(cat,
            op.getLocal(
              local.index,
              local.type.toBinaryenType(compiler.uintptrType)
            ),
            one
          );

          (<any>node).wasmType = local.type;
          return compiler.maybeConvertValue(node, op.teeLocal(local.index, calculate), intType, local.type, true);
        }
      }
    }
  }

  compiler.error(node, "Unsupported unary prefix operation", ts.SyntaxKind[node.operator]);
  return op.unreachable();
}
