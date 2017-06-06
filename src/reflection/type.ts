import { Class } from "./class";

export enum TypeKind {
  FirstInteger = 0,
  FirstUnsigned = 0,
  byte = 0,
  ushort = 1,
  uint = 2,
  ulong = 3,
  bool = 4,
  LastUnsigned = 5,
  uintptr = 5,
  FirstSigned = 6,
  sbyte = 6,
  short = 7,
  int = 8,
  LastSigned = 9,
  LastInteger = 9,
  long = 9,
  FirstFloat = 10,
  float = 10,
  LastFloat = 11,
  double = 11,
  void = 12
}

export class Type {
  kind: TypeKind;
  size: number;
  shift32?: number;
  mask32?: number;
  underlyingClass?: Class;

  constructor(kind: TypeKind, size: number, underlyingClass?: Class) {
    this.kind = kind;
    this.size = size;
    this.underlyingClass = underlyingClass;

    if (this.isByte || this.isShort) {
      this.shift32 = 32 - (size << 3);
      this.mask32 =  ~0 >>> this.shift32;
    } else if (this.kind === TypeKind.bool) {
      this.mask32 = 1;
      this.shift32 = 31;
    }
  }

  get isAnyInteger(): boolean { return this.kind >= TypeKind.FirstInteger && this.kind <= TypeKind.LastInteger; }
  get isAnyFloat(): boolean { return this.kind >= TypeKind.FirstFloat && this.kind <= TypeKind.LastFloat; }
  get isSigned(): boolean { return this.kind >= TypeKind.FirstSigned && this.kind <= TypeKind.LastSigned; }
  get isByte(): boolean { return this.kind === TypeKind.byte || this.kind === TypeKind.sbyte; }
  get isShort(): boolean { return this.kind === TypeKind.short || this.kind === TypeKind.ushort; }
  get isInt(): boolean { return this.kind === TypeKind.int || this.kind === TypeKind.uint || (this.kind === TypeKind.uintptr && this.size === 4); }
  get isLong(): boolean { return this.kind === TypeKind.long || this.kind === TypeKind.ulong || (this.kind === TypeKind.uintptr && this.size === 8); }
  get isClass(): boolean { return this.kind === TypeKind.uintptr && !!this.underlyingClass; }
  get isArray(): boolean { return this.isClass && (<Class>this.underlyingClass).name === "Array"; }

  withUnderlyingClass(underlyingClass: Class): Type {
    const type = new Type(this.kind, this.size);
    type.underlyingClass = underlyingClass;
    return type;
  }

  toString(): string {
    const str = TypeKind[this.kind];
    return this.underlyingClass ? this.underlyingClass.name : str;
  }
}

export { Type as default };

export const byteType      = new Type(TypeKind.byte   , 1);
export const sbyteType     = new Type(TypeKind.sbyte  , 1);
export const shortType     = new Type(TypeKind.short  , 2);
export const ushortType    = new Type(TypeKind.ushort , 2);
export const intType       = new Type(TypeKind.int    , 4);
export const uintType      = new Type(TypeKind.uint   , 4);
export const longType      = new Type(TypeKind.long   , 8);
export const ulongType     = new Type(TypeKind.ulong  , 8);
export const boolType      = new Type(TypeKind.bool   , 4);
export const floatType     = new Type(TypeKind.float  , 4);
export const doubleType    = new Type(TypeKind.double , 8);
export const uintptrType32 = new Type(TypeKind.uintptr, 4);
export const uintptrType64 = new Type(TypeKind.uintptr, 8);
export const voidType      = new Type(TypeKind.void   , 0);
