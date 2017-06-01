import { ReflectionObjectKind, TypedReflectionObject } from "./object";
import { Type } from "./type";

export class Global extends TypedReflectionObject {
  mutable: boolean;

  constructor(name: string, type: Type, mutable: boolean) {
    super(name, ReflectionObjectKind.Global, type);
    this.mutable = mutable;
  }
}
