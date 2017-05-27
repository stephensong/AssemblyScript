import { Compiler } from "../compiler";
import { intType } from "../types";
import { binaryenCategoryOf, binaryenTypeOf, binaryenOneOf, getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compilePostfixUnary(compiler: Compiler, node: ts.PostfixUnaryExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;
  const operand = compiler.compileExpression(node.operand, contextualType);
  const operandType = getWasmType(node.operand);

  setWasmType(node, operandType);

  if (node.operand.kind === ts.SyntaxKind.Identifier) {

    const local = compiler.currentLocals[(<ts.Identifier>node.operand).text];
    if (local) {

      switch (node.operator) {

        case ts.SyntaxKind.PlusPlusToken:
        case ts.SyntaxKind.MinusMinusToken:
        {
          const cat = binaryenCategoryOf(local.type, op, compiler.uintptrSize);
          const one = binaryenOneOf(local.type, op, compiler.uintptrSize);
          const isIncrement = node.operator === ts.SyntaxKind.PlusPlusToken;

          let calculate = (isIncrement ? cat.add : cat.sub).call(cat,
            op.getLocal(
              local.index,
              binaryenTypeOf(local.type, compiler.uintptrSize)
            ),
            one
          );

          if (local.type.isByte || local.type.isShort)
            calculate = compiler.maybeConvertValue(node, calculate, intType, local.type, true);

          return (isIncrement ? cat.sub : cat.add).call(cat, op.teeLocal(local.index, calculate), one);
        }
      }
    }
  }

  compiler.error(node, "Unsupported unary postfix operation");
  return op.unreachable();
}
