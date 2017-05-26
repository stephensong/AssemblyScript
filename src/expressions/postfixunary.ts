import {
  Compiler
} from "../compiler";

import {
  intType
} from "../types";

import {
  WasmExpression,
  WasmType
} from "../wasm";

export function compilePostfixUnary(compiler: Compiler, node: ts.PostfixUnaryExpression, contextualType: WasmType): WasmExpression {
  const op = compiler.module;
  const operand = compiler.compileExpression(node.operand, contextualType);
  const operandType = <WasmType>(<any>node.operand).wasmType;

  (<any>node).wasmType = (<any>node.operand).wasmType;

  if (node.operand.kind === ts.SyntaxKind.Identifier) {

    const local = compiler.currentLocals[(<ts.Identifier>node.operand).text];
    if (local) {

      switch (node.operator) {

        case ts.SyntaxKind.PlusPlusToken:
        case ts.SyntaxKind.MinusMinusToken:
        {
          const cat = compiler.categoryOf(local.type);
          const one = compiler.oneOf(local.type);
          const isIncrement = node.operator === ts.SyntaxKind.PlusPlusToken;

          let calculate = (isIncrement ? cat.add : cat.sub).call(cat,
            op.getLocal(
              local.index,
              local.type.toBinaryenType(compiler.uintptrType)
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
