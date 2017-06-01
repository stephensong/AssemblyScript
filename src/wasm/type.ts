export enum TypeKind {
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
  void,
  struct
}

export class Type {
  kind: TypeKind;
  size: number;
  underlyingType?: Type;
  structLayout?: Type[];
  shift32?: number;
  mask32?: number;

  constructor(kind: TypeKind, size: number, underlyingType?: Type) {
    this.kind = kind;
    this.size = size;
    this.underlyingType = underlyingType;

    if (this.isByte || this.isShort) {
      this.shift32 = 32 - (size << 3);
      this.mask32 =  ~0 >>> this.shift32;
    } else if (this.kind === TypeKind.bool) {
      this.mask32 = 1;
      this.shift32 = 31;
    }
  }

  get isAnyInteger(): boolean {
    switch (this.kind) {
      case TypeKind.byte:
      case TypeKind.sbyte:
      case TypeKind.short:
      case TypeKind.ushort:
      case TypeKind.int:
      case TypeKind.uint:
      case TypeKind.long:
      case TypeKind.ulong:
      case TypeKind.bool:
      case TypeKind.uintptr:
        return true;
    }
    return false;
  }

  get isAnyFloat(): boolean {
    switch (this.kind) {
      case TypeKind.float:
      case TypeKind.double:
        return true;
    }
    return false;
  }

  get isSigned(): boolean {
    switch (this.kind) {
      case TypeKind.sbyte:
      case TypeKind.short:
      case TypeKind.int:
      case TypeKind.long:
        return true;
    }
    return false;
  }

  get isByte(): boolean {
    switch (this.kind) {
      case TypeKind.byte:
      case TypeKind.sbyte:
        return true;
    }
    return false;
  }

  get isShort(): boolean {
    switch (this.kind) {
      case TypeKind.short:
      case TypeKind.ushort:
        return true;
    }
    return false;
  }

  get isInt(): boolean {
    switch (this.kind) {
      case TypeKind.int:
      case TypeKind.uint:
        return true;
      case TypeKind.uintptr:
        return this.size === 4;
    }
    return false;
  }

  get isLong(): boolean {
    switch (this.kind) {
      case TypeKind.long:
      case TypeKind.ulong:
        return true;
      case TypeKind.uintptr:
        return this.size === 8;
    }
    return false;
  }

  withUnderlyingType(underlyingType: Type): Type {
    if (underlyingType === null)
      throw Error("underlying type must be specified");

    if (this.kind !== TypeKind.uintptr)
      throw Error("only pointers can have an underlying type");

    const type = new Type(this.kind, this.size);
    type.underlyingType = underlyingType;
    return type;
  }

  toString(): string {
    const str = TypeKind[this.kind];
    return this.underlyingType ? str + "." + this.underlyingType.toString() : str;
  }
}
