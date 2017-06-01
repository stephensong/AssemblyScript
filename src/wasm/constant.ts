import { ReflectionObjectKind, TypedReflectionObject } from "./object";
import { Type } from "./type";

export class Constant extends TypedReflectionObject {
  value: any;

  constructor(name: string, type: Type, value: any) {
    super(name, ReflectionObjectKind.Constant, type);
    this.value = value;
  }
}
