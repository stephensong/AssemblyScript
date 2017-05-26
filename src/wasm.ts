import * as binaryen from "../lib/binaryen";

export {
  Module as WasmModule,
  Signature as WasmSignature,
  Statement as WasmStatement,
  Expression as WasmExpression,

  Type as BinaryenType,
  Function as BinaryenFunction,

  I32Expression as WasmI32Expression,
  I64Expression as WasmI64Expression,
  F32Expression as WasmF32Expression,
  F64Expression as WasmF64Expression,

  I32Operations as WasmI32Operations,
  I64Operations as WasmI64Operations,
  F32Operations as WasmF32Operations,
  F64Operations as WasmF64Operations
} from "../lib/binaryen";

export enum WasmTypeKind {
  byte,
  sbyte,
  short,
  ushort,
  int,
  uint,
  long,
  ulong,
  bool,
  float,
  double,
  uintptr,
  void
}

export class WasmType {
  kind: WasmTypeKind;
  size: number;
  underlyingType: WasmType;
  shift32: number;
  mask32: number;

  constructor(kind: WasmTypeKind, size: number, underlyingType: WasmType = null) {
    this.kind = kind;
    this.size = size;
    this.underlyingType = underlyingType;

    if (this.isByte || this.isShort) {
      this.shift32 = 32 - (size << 3);
      this.mask32 =  ~0 >>> this.shift32;
    } else if (this.kind === WasmTypeKind.bool) {
      this.mask32 = 1;
      this.shift32 = 31;
    }
  }

  get isAnyInteger(): boolean {
    switch (this.kind) {
      case WasmTypeKind.byte:
      case WasmTypeKind.sbyte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
      case WasmTypeKind.bool:
      case WasmTypeKind.uintptr:
        return true;
    }
    return false;
  }

  get isAnyFloat(): boolean {
    switch (this.kind) {
      case WasmTypeKind.float:
      case WasmTypeKind.double:
        return true;
    }
    return false;
  }

  get isSigned(): boolean {
    switch (this.kind) {
      case WasmTypeKind.sbyte:
      case WasmTypeKind.short:
      case WasmTypeKind.int:
      case WasmTypeKind.long:
        return true;
    }
    return false;
  }

  get isByte(): boolean {
    switch (this.kind) {
      case WasmTypeKind.byte:
      case WasmTypeKind.sbyte:
        return true;
    }
    return false;
  }

  get isShort(): boolean {
    switch (this.kind) {
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
        return true;
    }
    return false;
  }

  get isInt(): boolean {
    switch (this.kind) {
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
        return true;
      case WasmTypeKind.uintptr:
        return this.size === 4;
    }
    return false;
  }

  get isLong(): boolean {
    switch (this.kind) {
      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return true;
      case WasmTypeKind.uintptr:
        return this.size === 8;
    }
    return false;
  }

  withUnderlyingType(underlyingType: WasmType): WasmType {
    if (underlyingType === null)
      throw Error("underlying type must be specified");

    if (this.kind !== WasmTypeKind.uintptr)
      throw Error("only pointers can have an underlying type");

    const type = new WasmType(this.kind, this.size);
    type.underlyingType = underlyingType;
    return type;
  }

  toSignatureIdentifier(uintptrType: WasmType): string {
    switch (this.kind) {

      case WasmTypeKind.byte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.bool:
        return "i";

      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return "I";

      case WasmTypeKind.float:
        return "f";

      case WasmTypeKind.double:
        return "F";

      case WasmTypeKind.uintptr:
        return uintptrType.size === 4 ? "i" : "I";

      case WasmTypeKind.void:
        return "v";

    }
    throw Error("unexpected type");
  }

  toBinaryenType(uintptrType: WasmType): binaryen.Type {
    switch (this.kind) {

      case WasmTypeKind.byte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.bool:
        return binaryen.i32;

      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return binaryen.i64;

      case WasmTypeKind.float:
        return binaryen.f32;

      case WasmTypeKind.double:
        return binaryen.f64;

      case WasmTypeKind.uintptr:
        return uintptrType.size === 4 ? binaryen.i32 : binaryen.i64;

      case WasmTypeKind.void:
        return binaryen.none;

    }
    throw Error("unexpected type");
  }

  toBinaryenCategory(module: binaryen.Module, uintptrTyoe: WasmType): binaryen.I32Operations | binaryen.I64Operations | binaryen.F32Operations | binaryen.F64Operations {
    switch (this.kind) {

      case WasmTypeKind.byte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.bool:
        return module.i32;

      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return module.i64;

      case WasmTypeKind.float:
        return module.f32;

      case WasmTypeKind.double:
        return module.f64;

      case WasmTypeKind.uintptr:
        return uintptrTyoe.size === 4 ? module.i32 : module.i64;

    }
    throw Error("unexpected type");
  }

  toBinaryenZero(module: binaryen.Module, uintptrType: WasmType): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
    switch (this.kind) {

      case WasmTypeKind.byte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.bool:
        return module.i32.const(0);

      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return module.i64.const(0, 0);

      case WasmTypeKind.float:
        return module.f32.const(0);

      case WasmTypeKind.double:
        return module.f64.const(0);

      case WasmTypeKind.uintptr:
        return uintptrType.size === 4 ? module.i32.const(0) : module.i64.const(0, 0);

    }
    throw Error("unexpected type");
  }

  toBinaryenOne(module: binaryen.Module, uintptrTyoe: WasmType): binaryen.I32Expression | binaryen.I64Expression | binaryen.F32Expression | binaryen.F64Expression {
    switch (this.kind) {

      case WasmTypeKind.byte:
      case WasmTypeKind.short:
      case WasmTypeKind.ushort:
      case WasmTypeKind.int:
      case WasmTypeKind.uint:
      case WasmTypeKind.bool:
        return module.i32.const(1);

      case WasmTypeKind.long:
      case WasmTypeKind.ulong:
        return module.i64.const(1, 0);

      case WasmTypeKind.float:
        return module.f32.const(1);

      case WasmTypeKind.double:
        return module.f64.const(1);

      case WasmTypeKind.uintptr:
        return uintptrTyoe.size === 4 ? module.i32.const(1) : module.i64.const(1, 0);

    }
    throw Error("unexpected type");
  }

  toString(): string {
    return WasmTypeKind[this.kind];
  }
}

export enum WasmFunctionFlags {
  none        = 0,
  import      = 1 << 0,
  export      = 1 << 1,
  instance    = 1 << 2,
  constructor = 1 << 3
}

export interface WasmFunction {
  name: string;
  flags: WasmFunctionFlags;
  parameterTypes: WasmType[];
  returnType: WasmType;
  locals: WasmVariable[];
  signature: binaryen.Signature;
  signatureId: string;
}

export interface WasmVariable {
  name: string;
  index: number;
  type: WasmType;
}

export interface WasmConstant {
  name: string;
  type: WasmType;
  value: any;
}

export interface WasmField {
  name: string;
  offset: number;
  size: number;
}

export interface WasmClass {
  fields: WasmField[];
  constructor: WasmFunction;
}
