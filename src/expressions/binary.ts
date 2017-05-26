import { Compiler } from "../compiler";
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

    switch (node.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        return cat.add(left, right);

      case ts.SyntaxKind.MinusToken:
        return cat.sub(left, right);

      case ts.SyntaxKind.AsteriskToken:
        return cat.mul(left, right);

      case ts.SyntaxKind.SlashToken:
        if (resultType.isSigned)
          return cat.div_s(left, right);
        else
          return cat.div_u(left, right);

      case ts.SyntaxKind.PercentToken:
        if (resultType.isSigned)
          return cat.rem_s(left, right);
        else
          return cat.rem_u(left, right);

      case ts.SyntaxKind.AmpersandToken:
        return cat.and(left, right);

      case ts.SyntaxKind.BarToken:
        return cat.or(left, right);

      case ts.SyntaxKind.CaretToken:
        return cat.xor(left, right);

      case ts.SyntaxKind.LessThanLessThanToken:
        return cat.shl(left, right);

      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        if (resultType.isSigned)
          return cat.shr_s(left, right);
        else
          return cat.shr_u(left, right);

      case ts.SyntaxKind.EqualsEqualsToken:
        return cat.eq(left, right);

      case ts.SyntaxKind.ExclamationEqualsToken:
        return cat.ne(left, right);

      case ts.SyntaxKind.GreaterThanToken:
        if (resultType.isSigned)
          return cat.gt_s(left, right);
        else
          return cat.gt_u(left, right);

      case ts.SyntaxKind.GreaterThanEqualsToken:
        if (resultType.isSigned)
          return cat.ge_s(left, right);
        else
          return cat.ge_u(left, right);

      case ts.SyntaxKind.LessThanToken:
        if (resultType.isSigned)
          return cat.lt_s(left, right);
        else
          return cat.lt_u(left, right);

      case ts.SyntaxKind.LessThanEqualsToken:
        if (resultType.isSigned)
          return cat.le_s(left, right);
        else
          return cat.le_u(left, right);

    }
  }

  compiler.error(node.operatorToken, "Unsupported binary operator", ts.SyntaxKind[node.operatorToken.kind]);
  return op.unreachable();
}
