import { Constant } from "./constant";
import { ReflectionObjectKind, TypedReflectionObject } from "./object";
import { intType } from "../types";

export class Enum extends TypedReflectionObject {
  fields: { [key: string]: Constant } = {};

  constructor(name: string) {
    super(name, ReflectionObjectKind.Enum, intType);
  }

  addValue(name: string, value: number): Enum {
    this.fields[name] = new Constant(name, intType, value);
    return this;
  }

  getValue(name: string): Constant {
    return this.fields[name] || null;
  }
}
