import * as wasm from "./wasm";

export const byteType      = new wasm.Type(wasm.TypeKind.byte   , 1);
export const sbyteType     = new wasm.Type(wasm.TypeKind.sbyte  , 1);
export const shortType     = new wasm.Type(wasm.TypeKind.short  , 2);
export const ushortType    = new wasm.Type(wasm.TypeKind.ushort , 2);
export const intType       = new wasm.Type(wasm.TypeKind.int    , 4);
export const uintType      = new wasm.Type(wasm.TypeKind.uint   , 4);
export const longType      = new wasm.Type(wasm.TypeKind.long   , 8);
export const ulongType     = new wasm.Type(wasm.TypeKind.ulong  , 8);
export const boolType      = new wasm.Type(wasm.TypeKind.bool   , 4);
export const floatType     = new wasm.Type(wasm.TypeKind.float  , 4);
export const doubleType    = new wasm.Type(wasm.TypeKind.double , 8);
export const uintptrType32 = new wasm.Type(wasm.TypeKind.uintptr, 4);
export const uintptrType64 = new wasm.Type(wasm.TypeKind.uintptr, 8);
export const voidType      = new wasm.Type(wasm.TypeKind.void   , 0);

// Array types by TypeKind populated on demand in Compiler#resolveType
export const arrayTypes: { [key: number]: wasm.Type } = {};
