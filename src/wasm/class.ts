import { Function } from "./function";
import { ReflectionObjectKind, ReflectionObject, TypedReflectionObject } from "./object";
import { Type } from "./type";

export class Class extends ReflectionObject {
  fields: { [key: string]: Field } = {};
  ctor: Function;
  genericTypes: Type[] = [];
  size: 0;

  constructor(name: string) {
    super(name, ReflectionObjectKind.Class);
  }

  addField(field: Field): Class {
    this.fields[field.name] = field;
    this.size += field.type.size;
    return this;
  }
}

export class Field extends TypedReflectionObject {
  offset: number;

  constructor(name: string, type: Type, offset: number) {
    super(name, ReflectionObjectKind.Field, type);
    this.offset = offset;
  }
}
