import { Function, FunctionPrototype } from "./function";
import { Property, PropertyPrototype } from "./property";
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

export class ClassPrototype {
  name: string;
  properties: { [key: string]: PropertyPrototype } = {};
  methods: { [key: string]: FunctionPrototype } = {};
  ctor: FunctionPrototype;
  genericTypeNames: string[];

  constructor(name: string, genericTypeNames: string[]) {
    this.name = name;
    this.genericTypeNames = genericTypeNames;
  }
}

export { Class as default };
