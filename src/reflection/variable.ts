import { Type } from "./type";

export enum VariableFlags {
  none     = 0,
  constant = 1 << 0,
  global   = 1 << 2
}

export class Variable {
  name: string;
  type: Type;
  flags: VariableFlags;
  index: number;
  constantValue?: any;

  constructor(name: string, type: Type, flags: VariableFlags, index: number, constantValue?: any) {
    this.name = name;
    this.type = type;
    this.flags = flags;
    this.index = index;
    this.constantValue = constantValue;
  }

  get isConstant(): boolean { return (this.flags & VariableFlags.constant) !== 0; }
  get isGlobal(): boolean { return (this.flags & VariableFlags.global) !== 0; }

  toString(): string { return this.name; }
}

export { Variable as default };
