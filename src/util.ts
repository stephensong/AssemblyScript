import * as binaryen from "./binaryen";
import "byots";
import * as Long from "long";
import * as wasm from "./wasm";

export function isExport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword)
        return true;
  return false;
}

export function isImport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

export function isStatic(node: ts.Node): boolean {
  return (<ts.ModifierFlags>node.modifierFlagsCache & ts.ModifierFlags.Static) !== 0;
}

export function isConst(node: ts.Node): boolean {
  return (node.flags & ts.NodeFlags.Const) !== 0;
}

export function signatureIdentifierOf(type: wasm.Type, uintptrSize: number): string {
  switch (type.kind) {

    case wasm.TypeKind.byte:
    case wasm.TypeKind.short:
    case wasm.TypeKind.ushort:
    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.bool:
      return "i";

    case wasm.TypeKind.long:
    case wasm.TypeKind.ulong:
      return "I";

    case wasm.TypeKind.float:
      return "f";

    case wasm.TypeKind.double:
      return "F";

    case wasm.TypeKind.uintptr:
      return uintptrSize === 4 ? "i" : "I";

    case wasm.TypeKind.void:
      return "v";

  }
  throw Error("unexpected type");
}

export function binaryenTypeOf(type: wasm.Type, uintptrSize: number): binaryen.Type {
  switch (type.kind) {

    case wasm.TypeKind.byte:
    case wasm.TypeKind.short:
    case wasm.TypeKind.ushort:
    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.bool:
      return binaryen.i32;

    case wasm.TypeKind.long:
    case wasm.TypeKind.ulong:
      return binaryen.i64;

    case wasm.TypeKind.float:
      return binaryen.f32;

    case wasm.TypeKind.double:
      return binaryen.f64;

    case wasm.TypeKind.uintptr:
      return uintptrSize === 4 ? binaryen.i32 : binaryen.i64;

    case wasm.TypeKind.void:
      return binaryen.none;

  }
  throw Error("unexpected type");
}

export function binaryenCategoryOf(type: wasm.Type, module: binaryen.Module, uintptrSize: number): binaryen.I32Operations | binaryen.I64Operations | binaryen.F32Operations | binaryen.F64Operations {
  switch (type.kind) {

    case wasm.TypeKind.byte:
    case wasm.TypeKind.short:
    case wasm.TypeKind.ushort:
    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.bool:
      return module.i32;

    case wasm.TypeKind.long:
    case wasm.TypeKind.ulong:
      return module.i64;

    case wasm.TypeKind.float:
      return module.f32;

    case wasm.TypeKind.double:
      return module.f64;

    case wasm.TypeKind.uintptr:
      return uintptrSize === 4 ? module.i32 : module.i64;

  }
  throw Error("unexpected type");
}

export function binaryenValueOf(type: wasm.Type, module: binaryen.Module, value: number | Long) {

  if (type.isLong) {
    const long = Long.fromValue(value);
    return module.i64.const(long.low, long.high);
  } else if (Long.isLong(value))
    value = Long.fromValue(value).toNumber();

  value = <number>value;

  switch (type.kind) {

    case wasm.TypeKind.byte:
      return module.i32.const(value & 0xff);

    case wasm.TypeKind.sbyte:
      return module.i32.const((value << 24) >> 24);

    case wasm.TypeKind.short:
      return module.i32.const((value << 16) >> 16);

    case wasm.TypeKind.ushort:
      return module.i32.const(value & 0xffff);

    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.uintptr: // long already handled
      return module.i32.const(value);

    case wasm.TypeKind.bool:
      return module.i32.const(value ? 1 : 0);

    case wasm.TypeKind.float:
      return module.f32.const(value);

    case wasm.TypeKind.double:
      return module.f64.const(value);
  }
  throw Error("unexpected type");
}

const cachedArrayTypes: { [key: string]: wasm.Type } = {};

export function arrayTypeOf(type: wasm.Type, uintptrType: wasm.Type) {
  const key = type.toString();
  const arrayType = cachedArrayTypes[key];
  return arrayType || (cachedArrayTypes[key] = uintptrType.withUnderlyingType(type));
}

export function getWasmType(node: ts.Node): wasm.Type {
  return <wasm.Type>(<any>node).wasmType || null;
}

export function setWasmType(node: ts.Node, type: wasm.Type): void {
  if (!type)
    throw Error("type cannot be null");
  (<any>node).wasmType = type;
}

export function getWasmFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration): wasm.Function {
  return <wasm.Function>(<any>node).wasmFunction || null;
}

export function setWasmFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration, func: wasm.Function): void {
  if (!func)
    throw Error("func cannot be null");
  (<any>node).wasmFunction = func;
}

export function writeIntLE(buffer: Uint8Array, offset: number, value: number): void {
  buffer[offset    ] =  value        & 0xff;
  buffer[offset + 1] = (value >>  8) & 0xff;
  buffer[offset + 2] = (value >> 16) & 0xff;
  buffer[offset + 3] = (value >> 24) & 0xff;
}
