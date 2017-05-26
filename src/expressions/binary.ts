import {
  Compiler
} from "../compiler";

import {
  WasmType,
  WasmExpression,
  WasmI32Operations,
  WasmI64Operations,
  WasmF32Operations,
  WasmF64Operations
} from "../wasm";

export function compile(compiler: Compiler, node: ts.BinaryExpression, contextualType: WasmType): WasmExpression {
  const binaryNode = <ts.BinaryExpression>node;
  let leftExpr  = compiler.compileExpression(binaryNode.left, contextualType);
  let rightExpr = compiler.compileExpression(binaryNode.right, contextualType);
  const leftType  = <WasmType>(<any>binaryNode.left).wasmType;
  const rightType = <WasmType>(<any>binaryNode.right).wasmType;
  let resultType: WasmType;

  if (leftType.isAnyFloat) {

    if (rightType.isAnyFloat)
      resultType = leftType.size > rightType.size ? leftType : rightType;
    else
      resultType = leftType;

  } else if (rightType.isAnyFloat)
    resultType = rightType;
  else
    resultType = leftType.size > rightType.size ? leftType : rightType;

  // compile again with contextual result type so that literals are properly coerced
  if (leftType !== resultType)
    leftExpr = compiler.maybeConvertValue(binaryNode.left, compiler.compileExpression(binaryNode.left, resultType), leftType, resultType, false);
  if (rightType !== resultType)
    rightExpr = compiler.maybeConvertValue(binaryNode.right, compiler.compileExpression(binaryNode.right, resultType), rightType, resultType, false);

  const cat = compiler.categoryOf(resultType);

  (<any>binaryNode).wasmType = resultType;

  if (resultType.isAnyFloat) {

    const cat = <WasmF32Operations | WasmF64Operations>compiler.categoryOf(resultType);

    switch (binaryNode.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        return cat.add(leftExpr, rightExpr);

      case ts.SyntaxKind.MinusToken:
        return cat.sub(leftExpr, rightExpr);

      case ts.SyntaxKind.AsteriskToken:
        return cat.mul(leftExpr, rightExpr);

      case ts.SyntaxKind.SlashToken:
        return cat.div(leftExpr, rightExpr);

      case ts.SyntaxKind.EqualsEqualsToken:
        return cat.eq(leftExpr, rightExpr);

      case ts.SyntaxKind.ExclamationEqualsToken:
        return cat.ne(leftExpr, rightExpr);

      case ts.SyntaxKind.GreaterThanToken:
        return cat.gt(leftExpr, rightExpr);

      case ts.SyntaxKind.GreaterThanEqualsToken:
        return cat.ge(leftExpr, rightExpr);

      case ts.SyntaxKind.LessThanToken:
        return cat.lt(leftExpr, rightExpr);

      case ts.SyntaxKind.LessThanEqualsToken:
        return cat.le(leftExpr, rightExpr);

    }

  } else if (resultType.isAnyInteger) {

    const cat = <WasmI32Operations | WasmI64Operations>compiler.categoryOf(resultType);

    switch (binaryNode.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        return cat.add(leftExpr, rightExpr);

      case ts.SyntaxKind.MinusToken:
        return cat.sub(leftExpr, rightExpr);

      case ts.SyntaxKind.AsteriskToken:
        return cat.mul(leftExpr, rightExpr);

      case ts.SyntaxKind.SlashToken:
        if (resultType.isSigned)
          return cat.div_s(leftExpr, rightExpr);
        else
          return cat.div_u(leftExpr, rightExpr);

      case ts.SyntaxKind.PercentToken:
        if (resultType.isSigned)
          return cat.rem_s(leftExpr, rightExpr);
        else
          return cat.rem_u(leftExpr, rightExpr);

      case ts.SyntaxKind.AmpersandToken:
        return cat.and(leftExpr, rightExpr);

      case ts.SyntaxKind.BarToken:
        return cat.or(leftExpr, rightExpr);

      case ts.SyntaxKind.CaretToken:
        return cat.xor(leftExpr, rightExpr);

      case ts.SyntaxKind.LessThanLessThanToken:
        return cat.shl(leftExpr, rightExpr);

      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        if (resultType.isSigned)
          return cat.shr_s(leftExpr, rightExpr);
        else
          return cat.shr_u(leftExpr, rightExpr);

      case ts.SyntaxKind.EqualsEqualsToken:
        return cat.eq(leftExpr, rightExpr);

      case ts.SyntaxKind.ExclamationEqualsToken:
        return cat.ne(leftExpr, rightExpr);

      case ts.SyntaxKind.GreaterThanToken:
        if (resultType.isSigned)
          return cat.gt_s(leftExpr, rightExpr);
        else
          return cat.gt_u(leftExpr, rightExpr);

      case ts.SyntaxKind.GreaterThanEqualsToken:
        if (resultType.isSigned)
          return cat.ge_s(leftExpr, rightExpr);
        else
          return cat.ge_u(leftExpr, rightExpr);

      case ts.SyntaxKind.LessThanToken:
        if (resultType.isSigned)
          return cat.lt_s(leftExpr, rightExpr);
        else
          return cat.lt_u(leftExpr, rightExpr);

      case ts.SyntaxKind.LessThanEqualsToken:
        if (resultType.isSigned)
          return cat.le_s(leftExpr, rightExpr);
        else
          return cat.le_u(leftExpr, rightExpr);

    }
  }

  compiler.error(binaryNode.operatorToken, "Unsupported binary operator", ts.SyntaxKind[binaryNode.operatorToken.kind]);
}
