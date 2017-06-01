import { Compiler } from "./compiler";
import { intType, uintType, longType, ulongType, uintptrType32, uintptrType64, floatType, doubleType } from "./types";
import { getWasmType } from "./util";
import { binaryen } from "./wasm";
import * as wasm from "./wasm";

type TypeScriptExpressionPair = [ ts.Expression, ts.Expression ];
type BinaryenExpressionPair = [ binaryen.Expression, binaryen.Expression ];

export function rotl(compiler: Compiler, node: TypeScriptExpressionPair, expr: BinaryenExpressionPair): binaryen.Expression {
  const leftType = getWasmType(node[0]);
  const rightType = getWasmType(node[1]);

  if (leftType === rightType) {

    switch (leftType) {

      case intType:
      case uintType:
      case uintptrType32:
        return compiler.module.i32.rotl(expr[0], expr[1]);

      case longType:
      case ulongType:
      case uintptrType64:
        return compiler.module.i64.rotl(expr[0], expr[1]);
    }
  }
  throw Error("unsupported operation");
}

export function rotr(compiler: Compiler, node: TypeScriptExpressionPair, expr: BinaryenExpressionPair): binaryen.Expression {
  const leftType = getWasmType(node[0]);
  const rightType = getWasmType(node[1]);

  if (leftType === rightType) {
    switch (leftType) {

      case intType:
      case uintType:
      case uintptrType32:
        return compiler.module.i32.rotr(expr[0], expr[1]);

      case longType:
      case ulongType:
      case uintptrType64:
        return compiler.module.i64.rotr(expr[0], expr[1]);
    }
  }
  throw Error("unsupported operation");
}

export function clz(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case intType:
    case uintType:
    case uintptrType32:
      return compiler.module.i32.clz(expr);

    case longType:
    case ulongType:
    case uintptrType64:
      return compiler.module.i64.clz(expr);
  }
  throw Error("unsupported operation");
}

export function ctz(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case intType:
    case uintType:
    case uintptrType32:
      return compiler.module.i32.ctz(expr);

    case longType:
    case ulongType:
    case uintptrType64:
      return compiler.module.i64.ctz(expr);
  }
  throw Error("unsupported operation");
}

export function popcnt(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case intType:
    case uintType:
    case uintptrType32:
      return compiler.module.i32.popcnt(expr);

    case longType:
    case ulongType:
    case uintptrType64:
      return compiler.module.i64.popcnt(expr);
  }
  throw Error("unsupported operation");
}

export function abs(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.abs(expr);

    case doubleType:
      return compiler.module.f64.abs(expr);
  }
  throw Error("unsupported operation");
}

export function ceil(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.ceil(expr);

    case doubleType:
      return compiler.module.f64.ceil(expr);
  }
  throw Error("unsupported operation");
}

export function floor(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.floor(expr);

    case doubleType:
      return compiler.module.f64.floor(expr);
  }
  throw Error("unsupported operation");
}

export function sqrt(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.sqrt(expr);

    case doubleType:
      return compiler.module.f64.sqrt(expr);
  }
  throw Error("unsupported operation");
}

export function trunc(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.trunc(expr);

    case doubleType:
      return compiler.module.f64.trunc(expr);
  }
  throw Error("unsupported operation");
}

export function nearest(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const type = getWasmType(node);

  switch (type) {

    case floatType:
      return compiler.module.f32.nearest(expr);

    case doubleType:
      return compiler.module.f64.nearest(expr);
  }
  throw Error("unsupported operation");
}

export function min(compiler: Compiler, node: TypeScriptExpressionPair, expr: BinaryenExpressionPair): binaryen.Expression {
  const leftType = getWasmType(node[0]);
  const rightType = getWasmType(node[1]);

  if (leftType === rightType) {
    switch (leftType) {

      case floatType:
        return compiler.module.f32.min(expr[0], expr[1]);

      case doubleType:
        return compiler.module.f64.min(expr[0], expr[1]);
    }
  }
  throw Error("unsupported operation");
}

export function max(compiler: Compiler, node: TypeScriptExpressionPair, expr: BinaryenExpressionPair): binaryen.Expression {
  const leftType = getWasmType(node[0]);
  const rightType = getWasmType(node[1]);

  if (leftType === rightType) {
    switch (leftType) {

      case floatType:
        return compiler.module.f32.max(expr[0], expr[1]);

      case doubleType:
        return compiler.module.f64.max(expr[0], expr[1]);
    }
  }
  throw Error("unsupported operation");
}

export function copysign(compiler: Compiler, node: TypeScriptExpressionPair, expr: BinaryenExpressionPair): binaryen.Expression {
  const leftType = getWasmType(node[0]);
  const rightType = getWasmType(node[1]);

  if (leftType === rightType) {
    switch (leftType) {

      case floatType:
        return compiler.module.f32.copysign(expr[0], expr[1]);

      case doubleType:
        return compiler.module.f64.copysign(expr[0], expr[1]);
    }
  }
  throw Error("unsupported operation");
}

export function reinterpret(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const op = compiler.module;
  const type = getWasmType(node);

  switch (type) {

    case intType:
    case uintType:
    case uintptrType32:
      return op.f32.reinterpret(expr);

    case longType:
    case ulongType:
    case uintptrType64:
      return op.f64.reinterpret(expr);

    case floatType:
      return op.i32.reinterpret(expr);

    case doubleType:
      return op.i64.reinterpret(expr);

  }
  throw Error("unsupported operation");
}

export function current_memory(compiler: Compiler): binaryen.Expression {
  const op = compiler.module;
  return op.currentMemory();
}

export function grow_memory(compiler: Compiler, node: ts.Expression, expr: binaryen.Expression): binaryen.Expression {
  const op = compiler.module;
  const type = getWasmType(node);

  if (type.isInt)
    return op.growMemory(expr);

  throw Error("unsupported operation");
}

export function sizeof(compiler: Compiler, type: wasm.Type): binaryen.Expression {
  const op = compiler.module;
  return compiler.uintptrType === uintptrType32
    ? op.i32.const(type.size)
    : op.i64.const(type.size, 0);
}
