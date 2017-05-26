import { Compiler } from "../compiler";
import { intType } from "../types";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileBinary(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  let left  = compiler.compileExpression(node.left, contextualType);
  let right = compiler.compileExpression(node.right, contextualType);

  const leftType  = <wasm.Type>(<any>node.left).wasmType;
  const rightType = <wasm.Type>(<any>node.right).wasmType;

  let resultType: wasm.Type;

  if (leftType.isAnyFloat) {

    if (rightType.isAnyFloat)
      resultType = leftType.size > rightType.size ? leftType : rightType;
    else
      resultType = leftType;

  } else if (rightType.isAnyFloat)
    resultType = rightType;
  else
    resultType = leftType.size > rightType.size ? leftType : rightType;

  // compile again with common contextual type so that literals are properly coerced
  if (leftType !== resultType)
    left = compiler.maybeConvertValue(node.left, compiler.compileExpression(node.left, resultType), leftType, resultType, false);
  if (rightType !== resultType)
    right = compiler.maybeConvertValue(node.right, compiler.compileExpression(node.right, resultType), rightType, resultType, false);

  (<any>node).wasmType = resultType;

  if (resultType.isAnyFloat) {

    const cat = <binaryen.F32Operations | binaryen.F64Operations>compiler.categoryOf(resultType);

    switch (node.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        return cat.add(left, right);

      case ts.SyntaxKind.MinusToken:
        return cat.sub(left, right);

      case ts.SyntaxKind.AsteriskToken:
        return cat.mul(left, right);

      case ts.SyntaxKind.SlashToken:
        return cat.div(left, right);

      case ts.SyntaxKind.EqualsEqualsToken:
        return cat.eq(left, right);

      case ts.SyntaxKind.ExclamationEqualsToken:
        return cat.ne(left, right);

      case ts.SyntaxKind.GreaterThanToken:
        return cat.gt(left, right);

      case ts.SyntaxKind.GreaterThanEqualsToken:
        return cat.ge(left, right);

      case ts.SyntaxKind.LessThanToken:
        return cat.lt(left, right);

      case ts.SyntaxKind.LessThanEqualsToken:
        return cat.le(left, right);

    }

  } else if (resultType.isAnyInteger) {

    const cat = <binaryen.I32Operations | binaryen.I64Operations>compiler.categoryOf(resultType);

    let result: binaryen.Expression;

    switch (node.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        result = cat.add(left, right);
        break;

      case ts.SyntaxKind.MinusToken:
        result = cat.sub(left, right);
        break;

      case ts.SyntaxKind.AsteriskToken:
        result = cat.mul(left, right);
        break;

      case ts.SyntaxKind.SlashToken:
        if (resultType.isSigned)
          result = cat.div_s(left, right);
        else
          result = cat.div_u(left, right);
        break;

      case ts.SyntaxKind.PercentToken:
        if (resultType.isSigned)
          result = cat.rem_s(left, right);
        else
          result = cat.rem_u(left, right);
        break;

      case ts.SyntaxKind.AmpersandToken:
        result = cat.and(left, right);
        break;

      case ts.SyntaxKind.BarToken:
        result = cat.or(left, right);
        break;

      case ts.SyntaxKind.CaretToken:
        result = cat.xor(left, right);
        break;

      case ts.SyntaxKind.LessThanLessThanToken:
        result = cat.shl(left, right);
        break;

      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        if (resultType.isSigned)
          result = cat.shr_s(left, right);
        else
          result = cat.shr_u(left, right);
        break;

      case ts.SyntaxKind.EqualsEqualsToken:
        result = cat.eq(left, right);
        break;

      case ts.SyntaxKind.ExclamationEqualsToken:
        result = cat.ne(left, right);
        break;

      case ts.SyntaxKind.GreaterThanToken:
        if (resultType.isSigned)
          result = cat.gt_s(left, right);
        else
          result = cat.gt_u(left, right);
        break;

      case ts.SyntaxKind.GreaterThanEqualsToken:
        if (resultType.isSigned)
          result = cat.ge_s(left, right);
        else
          result = cat.ge_u(left, right);
        break;

      case ts.SyntaxKind.LessThanToken:
        if (resultType.isSigned)
          result = cat.lt_s(left, right);
        else
          result = cat.lt_u(left, right);
        break;

      case ts.SyntaxKind.LessThanEqualsToken:
        if (resultType.isSigned)
          result = cat.le_s(left, right);
        else
          result = cat.le_u(left, right);
        break;

    }

    if (result)
      return compiler.maybeConvertValue(node, result, intType, resultType, true);
  }

  compiler.error(node.operatorToken, "Unsupported binary operator", ts.SyntaxKind[node.operatorToken.kind]);
  return op.unreachable();
}
