import { Compiler } from "../compiler";
import { intType, voidType } from "../types";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";
import { binaryenCategoryOf, binaryenTypeOf } from "../util";
import * as wasm from "../wasm";

export function compileAssignment(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;

  setWasmType(node, contextualType);

  if (node.left.kind === ts.SyntaxKind.Identifier) {
    const identifierNode = <ts.Identifier>node.left;
    const referenced = compiler.resolveIdentifier(identifierNode.text);

    if (referenced) {
      const right = compiler.maybeConvertValue(node.right, compiler.compileExpression(node.right, referenced.type), getWasmType(node.right), referenced.type, false);

      setWasmType(node, contextualType === voidType ? voidType : referenced.type);

      switch (referenced.kind) {

        case wasm.ReflectionObjectKind.Variable:

          if (contextualType === voidType)
            return op.setLocal((<wasm.Variable>referenced).index, right);
          else
            return op.teeLocal((<wasm.Variable>referenced).index, right);

        case wasm.ReflectionObjectKind.Global:

          if (contextualType === voidType)
            return op.setGlobal((<wasm.Global>referenced).name, right);
          else
            return op.block("", [
              op.setGlobal((<wasm.Global>referenced).name, right),
              op.getGlobal((<wasm.Global>referenced).name, binaryenTypeOf(referenced.type, compiler.uintptrSize))
            ], binaryenTypeOf(referenced.type, compiler.uintptrSize));

      }

    }

    compiler.error(node.left, "Unresolvable variable reference");
  } else
    compiler.error(node.operatorToken, "Unsupported assignment");
  return op.unreachable();
}

export function compileCompoundAssignment(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;
  const isIncrement = node.operatorToken.kind === ts.SyntaxKind.FirstCompoundAssignment;

  setWasmType(node, contextualType);

  if (node.left.kind === ts.SyntaxKind.Identifier) {
    const identifierNode = <ts.Identifier>node.left;
    const referenced = compiler.resolveIdentifier(identifierNode.text);

    if (referenced) {
      const cat = <binaryen.F32Operations | binaryen.F64Operations>binaryenCategoryOf(referenced.type, op, compiler.uintptrSize);
      const left = compiler.compileExpression(node.left, contextualType);
      const right = compiler.compileExpression(node.right, contextualType);
      const calculate = (isIncrement ? cat.add : cat.sub).call(cat, left, right);

      setWasmType(node, contextualType === voidType ? voidType : referenced.type);

      switch (referenced.kind) {

        case wasm.ReflectionObjectKind.Variable:

          if (contextualType === voidType)
            return op.setLocal((<wasm.Variable>referenced).index, calculate);
          else
            return op.teeLocal((<wasm.Variable>referenced).index, calculate);

        case wasm.ReflectionObjectKind.Global:

          if (contextualType === voidType)
            return op.setGlobal((<wasm.Global>referenced).name, calculate);
          else
            return op.block("", [
              op.setGlobal((<wasm.Global>referenced).name, calculate),
              op.getGlobal((<wasm.Global>referenced).name, binaryenTypeOf(referenced.type, compiler.uintptrSize))
            ], binaryenTypeOf(referenced.type, compiler.uintptrSize));

      }
    }

    compiler.error(node.left, "Unresolvable variable reference");
  } else
    compiler.error(node.operatorToken, "Unsupported compound assignment");
  return op.unreachable();
}

export function compileBinary(compiler: Compiler, node: ts.BinaryExpression, contextualType: wasm.Type): binaryen.Expression {

  if (node.operatorToken.kind === ts.SyntaxKind.FirstAssignment)
    return compileAssignment(compiler, node, contextualType);

  if (node.operatorToken.kind === ts.SyntaxKind.FirstCompoundAssignment || node.operatorToken.kind === ts.SyntaxKind.MinusEqualsToken)
    return compileCompoundAssignment(compiler, node, contextualType);

  const op = compiler.module;

  let left  = compiler.compileExpression(node.left, contextualType);
  let right = compiler.compileExpression(node.right, contextualType);

  const leftType  = getWasmType(node.left);
  const rightType = getWasmType(node.right);

  let resultType: wasm.Type;

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

  // compile again with common contextual type so that literals are properly coerced
  if (leftType !== resultType)
    left = compiler.maybeConvertValue(node.left, compiler.compileExpression(node.left, resultType), leftType, resultType, false);
  if (rightType !== resultType)
    right = compiler.maybeConvertValue(node.right, compiler.compileExpression(node.right, resultType), rightType, resultType, false);

  setWasmType(node, resultType);

  if (resultType.isAnyFloat) {

    const cat = <binaryen.F32Operations | binaryen.F64Operations>binaryenCategoryOf(resultType, op, compiler.uintptrSize);

    switch (node.operatorToken.kind) {

      case ts.SyntaxKind.PlusToken:
        return cat.add(left, right);

      case ts.SyntaxKind.MinusToken:
        return cat.sub(left, right);

      case ts.SyntaxKind.AsteriskToken:
        return cat.mul(left, right);

      case ts.SyntaxKind.SlashToken:
        return cat.div(left, right);

      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        compiler.warn(node.operatorToken, "Assuming '=='");
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

    const cat = <binaryen.I32Operations | binaryen.I64Operations>binaryenCategoryOf(resultType, op, compiler.uintptrSize);

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
      return compiler.maybeConvertValue(node, result, intType, resultType, true);
  }

  compiler.error(node.operatorToken, "Unsupported binary operator", ts.SyntaxKind[node.operatorToken.kind]);
  return op.unreachable();
}
