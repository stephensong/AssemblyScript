import { Function } from "./function";
import { Property } from "./property";
import { Type } from "./type";

export class Class {
  name: string;
  type: Type;
  properties: { [key: string]: Property } = {};
  methods: { [key: string]: Function } = {};
  ctor: Function;
  genericTypes: Type[];
  size: number = 0;

  constructor(name: string, uintptrType: Type, genericTypes: Type[]) {
    this.name = name;
    this.type = uintptrType.withUnderlyingClass(this);
    this.genericTypes = genericTypes;
  }
}

export { Class as default };
