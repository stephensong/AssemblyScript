import { Type } from "./type";

/** Flags describing the kind of a variable. */
export enum VariableFlags {
  none     = 0,
  constant = 1 << 0,
  global   = 1 << 1
}

/** A reflected variable. */
export class Variable {
  /** Simple or global name, depending on context. */
  name: string;
  /** Reflected type. */
  type: Type;
  /** Flags. */
  flags: VariableFlags;
  /** Local index, if applicable. */
  index: number;

  /** Constructs a new reflected variable. */
  constructor(name: string, type: Type, flags: VariableFlags, index: number) {
    this.name = name;
    this.type = type;
    this.flags = flags;
    this.index = index;
  }

  /** Tests if this variable is declared constant. */
  get isConstant(): boolean { return (this.flags & VariableFlags.constant) !== 0; }
  /** Tests if this is a global variable. */
  get isGlobal(): boolean { return (this.flags & VariableFlags.global) !== 0; }

  toString(): string { return this.name; }
}

export { Variable as default };
