import { Type } from "./type";

export enum PropertyFlags {
  none     = 0,
  constant = 1 << 0,
  instance = 1 << 1
}

export class PropertyBase {
  name: string;
  flags: PropertyFlags;
  constantValue?: any;

  constructor(name: string, flags: PropertyFlags) {
    this.name = name;
    this.flags = flags;
  }

  get isConstant(): boolean { return (this.flags & PropertyFlags.constant) !== 0; }
  get isInstance(): boolean { return (this.flags & PropertyFlags.instance) !== 0; }
}

export class Property extends PropertyBase {
  type: Type;
  offset: number;

  constructor(name: string, type: Type, flags: PropertyFlags, offset: number) {
    super(name, flags);
    this.type = type;
    this.offset = offset;
  }
}

export { Property as default };

export class PropertyPrototype extends PropertyBase {
  typeName: string;

  constructor(name: string, typeName: string, flags: PropertyFlags) {
    super(name, flags);
    this.typeName = typeName;
  }
}
