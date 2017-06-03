import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { intType, voidType } from "../types";
import { getWasmType, setWasmType } from "../util";
import { binaryenCategoryOf, binaryenTypeOf } from "../util";
import * as wasm from "../wasm";

export function compileBinary(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {

  if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken)
    return compileAssignment(compiler, node, contextualType);

  const isCompound = node.operatorToken.kind >= ts.SyntaxKind.FirstCompoundAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastCompoundAssignment;
  const op = compiler.module;

  let left  = compiler.compileExpression(node.left, contextualType);
  let right = compiler.compileExpression(node.right, contextualType);

  const leftType  = getWasmType(node.left);
  const rightType = getWasmType(node.right);

  let resultType: wasm.Type;

  if (isCompound) {
    resultType = leftType;
  } else {

    if (leftType.isAnyFloat) {

      if (rightType.isAnyFloat)
        resultType = leftType.size > rightType.size ? leftType : rightType;
      else
        resultType = leftType;

    } else if (rightType.isAnyFloat)
      resultType = rightType;
    else /* int */ if (leftType.kind === wasm.TypeKind.uintptr && rightType.kind !== wasm.TypeKind.uintptr)
      resultType = leftType;
    else if (leftType.kind !== wasm.TypeKind.uintptr && rightType.kind === wasm.TypeKind.uintptr)
      resultType = rightType;
    else
      resultType = leftType.size >= rightType.size ? leftType : rightType;
  }

  // compile again with common contextual type so that literals can be properly coerced
  if (leftType !== resultType)
    left = compiler.maybeConvertValue(node.left, compiler.compileExpression(node.left, resultType), leftType, resultType, false);
  if (rightType !== resultType)
    right = compiler.maybeConvertValue(node.right, compiler.compileExpression(node.right, resultType), rightType, resultType, false);

  setWasmType(node, resultType);

  let result: binaryen.Expression | null = null;

  if (resultType.isAnyFloat) {

    const cat = <binaryen.F32Operations | binaryen.F64Operations>binaryenCategoryOf(resultType, op, compiler.uintptrSize);

    switch (node.operatorToken.kind) {

      // Arithmetic
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.PlusEqualsToken:
        result = cat.add(left, right);
        break;

      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.MinusEqualsToken:
        result = cat.sub(left, right);
        break;

      case ts.SyntaxKind.AsteriskToken:
      case ts.SyntaxKind.AsteriskEqualsToken:
        result = cat.mul(left, right);
        break;

      case ts.SyntaxKind.SlashToken:
      case ts.SyntaxKind.SlashEqualsToken:
        result = cat.div(left, right);
        break;

      case ts.SyntaxKind.PercentToken:
      case ts.SyntaxKind.PercentEqualsToken:
        // TODO: maybe emulate, not a built-in operation
        break;

      // Logical
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        compiler.warn(node.operatorToken, "Assuming '=='");
      case ts.SyntaxKind.EqualsEqualsToken:
        result = cat.eq(left, right);
        break;

      case ts.SyntaxKind.ExclamationEqualsToken:
        result = cat.ne(left, right);
        break;

      case ts.SyntaxKind.GreaterThanToken:
        result = cat.gt(left, right);
        break;

      case ts.SyntaxKind.GreaterThanEqualsToken:
        result = cat.ge(left, right);
        break;

      case ts.SyntaxKind.LessThanToken:
        result = cat.lt(left, right);
        break;

      case ts.SyntaxKind.LessThanEqualsToken:
        result = cat.le(left, right);
        break;

    }

  } else if (resultType.isAnyInteger) {

    const cat = <binaryen.I32Operations | binaryen.I64Operations>binaryenCategoryOf(resultType, op, compiler.uintptrSize);

    switch (node.operatorToken.kind) {

      // Arithmetic
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.PlusEqualsToken:
        result = cat.add(left, right);
        break;

      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.MinusEqualsToken:
        result = cat.sub(left, right);
        break;

      case ts.SyntaxKind.AsteriskToken:
      case ts.SyntaxKind.AsteriskEqualsToken:
        result = cat.mul(left, right);
        break;

      case ts.SyntaxKind.SlashToken:
      case ts.SyntaxKind.SlashEqualsToken:
        if (resultType.isSigned)
          result = cat.div_s(left, right);
        else
          result = cat.div_u(left, right);
        break;

      case ts.SyntaxKind.PercentToken:
      case ts.SyntaxKind.PercentEqualsToken:
        if (resultType.isSigned)
          result = cat.rem_s(left, right);
        else
          result = cat.rem_u(left, right);
        break;

      case ts.SyntaxKind.AmpersandToken:
      case ts.SyntaxKind.AmpersandEqualsToken:
        result = cat.and(left, right);
        break;

      case ts.SyntaxKind.BarToken:
      case ts.SyntaxKind.BarEqualsToken:
        result = cat.or(left, right);
        break;

      case ts.SyntaxKind.CaretToken:
      case ts.SyntaxKind.CaretEqualsToken:
        result = cat.xor(left, right);
        break;

      case ts.SyntaxKind.LessThanLessThanToken:
      case ts.SyntaxKind.LessThanLessThanEqualsToken:
        result = cat.shl(left, right);
        break;

      case ts.SyntaxKind.GreaterThanGreaterThanToken:
      case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
        if (resultType.isSigned)
          result = cat.shr_s(left, right);
        else
          result = cat.shr_u(left, right);
        break;

      // Logical
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        compiler.warn(node.operatorToken, "Assuming '=='");
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
      result = compiler.maybeConvertValue(node, result, intType, resultType, true);
  }

  if (result)
    return isCompound
      ? compileAssignmentWithValue(compiler, node, result, resultType)
      : result;

  compiler.error(node.operatorToken, "Unsupported binary operator", ts.SyntaxKind[node.operatorToken.kind]);
  return op.unreachable();
}

export function compileAssignment(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {
  return compileAssignmentWithValue(compiler, node, compiler.compileExpression(node.right, contextualType), getWasmType(node.right));
}

export function compileAssignmentWithValue(compiler: Compiler, node: ts.BinaryExpression, value: binaryen.Expression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  setWasmType(node, contextualType);

  // someVar = expression
  if (node.left.kind === ts.SyntaxKind.Identifier) {
    const reference = compiler.resolveReference(<ts.Identifier>node.left);
    if (reference) {
      switch (reference.kind) {

        case wasm.ReflectionObjectKind.Variable:
        {
          const variable = <wasm.Variable>reference;
          const expression = compiler.maybeConvertValue(node.right, value, getWasmType(node.right), variable.type, false);

          if (contextualType === voidType)
            return op.setLocal(variable.index, expression);

          setWasmType(node, variable.type);
          return op.teeLocal(variable.index, expression);
        }

        case wasm.ReflectionObjectKind.Global:
        {
          const global = <wasm.Global>reference;
          const expression = compiler.maybeConvertValue(node.right, value, getWasmType(node.right), global.type, false)

          if (contextualType === voidType)
            return op.setGlobal(global.name, expression);

          setWasmType(node, global.type);
          return op.block("", [ // emulates teeGlobal
            op.setGlobal(global.name, expression),
            op.getGlobal(global.name, binaryenTypeOf(global.type, compiler.uintptrSize))
          ], binaryenTypeOf(global.type, compiler.uintptrSize));
        }

      }
    }
  }

  compiler.error(node.operatorToken, "Unsupported assignment", ts.SyntaxKind[node.left.kind]);
  return op.unreachable();
}
