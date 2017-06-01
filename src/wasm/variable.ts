import { ReflectionObjectKind, TypedReflectionObject } from "./object";
import { Type } from "./type";

export class Variable extends TypedReflectionObject {
  index: number;

  constructor(name: string, type: Type, index: number) {
    super(name, ReflectionObjectKind.Variable, type);
    this.index = index;
  }
}
