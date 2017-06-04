import { Type } from "./type";

export enum PropertyFlags {
  none     = 0,
  constant = 1 << 0,
  instance = 1 << 1
}

export class Property {
  name: string;
  type: Type;
  flags: PropertyFlags;
  offset: number;
  constantValue?: number;

  constructor(name: string, type: Type, flags: PropertyFlags, offset: number) {
    this.name = name;
    this.type = type;
    this.flags = flags;
    this.offset = offset;
  }

  get isConstant(): boolean { return (this.flags & PropertyFlags.constant) !== 0; }
  get isInstance(): boolean { return (this.flags & PropertyFlags.instance) !== 0; }
}
