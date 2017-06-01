import { Type } from "./type";

export enum ReflectionObjectKind {
  Function = 1 << 0,
  Variable = 1 << 1,
  Constant = 1 << 2,
  Global   = 1 << 3,
  Class    = 1 << 4,
  Field    = 1 << 5,
  AnyTyped = Variable | Constant | Global | Field
}

export abstract class ReflectionObject {
  name: string;
  kind: ReflectionObjectKind;

  constructor(name: string, kind: ReflectionObjectKind) {
    this.name = name;
    this.kind = kind;
  }
}

export abstract class TypedReflectionObject extends ReflectionObject {
  type: Type;

  constructor(name: string, kind: ReflectionObjectKind, type: Type) {
    super(name, kind);
    this.type = type;
  }
}
