import "byots";
import { binaryen } from "./wasm";
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
  return (node.modifierFlagsCache & ts.ModifierFlags.Static) !== 0;
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

export function binaryenZeroOf(type: wasm.Type, module: binaryen.Module, uintptrSize: number): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
  switch (type.kind) {

    case wasm.TypeKind.byte:
    case wasm.TypeKind.short:
    case wasm.TypeKind.ushort:
    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.bool:
      return module.i32.const(0);

    case wasm.TypeKind.long:
    case wasm.TypeKind.ulong:
      return module.i64.const(0, 0);

    case wasm.TypeKind.float:
      return module.f32.const(0);

    case wasm.TypeKind.double:
      return module.f64.const(0);

    case wasm.TypeKind.uintptr:
      return uintptrSize === 4 ? module.i32.const(0) : module.i64.const(0, 0);

  }
  throw Error("unexpected type");
}

export function binaryenOneOf(type: wasm.Type, module: binaryen.Module, uintptrSize: number): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
  switch (type.kind) {

    case wasm.TypeKind.byte:
    case wasm.TypeKind.short:
    case wasm.TypeKind.ushort:
    case wasm.TypeKind.int:
    case wasm.TypeKind.uint:
    case wasm.TypeKind.bool:
      return module.i32.const(1);

    case wasm.TypeKind.long:
    case wasm.TypeKind.ulong:
      return module.i64.const(1, 0);

    case wasm.TypeKind.float:
      return module.f32.const(1);

    case wasm.TypeKind.double:
      return module.f64.const(1);

    case wasm.TypeKind.uintptr:
      return uintptrSize === 4 ? module.i32.const(1) : module.i64.const(1, 0);

  }
  throw Error("unexpected type");
}
