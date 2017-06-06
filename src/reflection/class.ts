import Compiler from "../compiler";
import { Function } from "./function";
import { Property } from "./property";
import { Type } from "./type";
import * as typescript from "../typescript";

export abstract class ClassBase {
  name: string;
  declaration: typescript.ClassDeclaration;

  constructor(name: string, declaration: typescript.ClassDeclaration) {
    this.name = name;
    this.declaration = declaration;
  }
}

/** A class instance with generic parameters resolved. */
export class Class extends ClassBase {
  type: Type;
  typeParametersMap: { [key: string]: Type };

  properties: { [key: string]: Property } = {};
  methods: { [key: string]: Function } = {};
  ctor: Function;
  size: number = 0;

  constructor(name: string, declaration: typescript.ClassDeclaration, uintptrType: Type, typeParametersMap: { [key: string]: Type }) {
    super(name, declaration);
    this.type = uintptrType.withUnderlyingClass(this);
    this.typeParametersMap = typeParametersMap;
  }
}

export { Class as default };

/** A class template with possibly unresolved generic parameters. */
export class ClassTemplate extends ClassBase {
  instances: { [key: string]: Class } = {};

  constructor(name: string, declaration: typescript.ClassDeclaration) {
    super(name, declaration);
  }

  get isGeneric(): boolean { return !!(this.declaration.typeParameters && this.declaration.typeParameters.length); }

  resolve(compiler: Compiler, typeArguments: typescript.TypeNode[]): Class {
    const typeParametersCount = this.declaration.typeParameters && this.declaration.typeParameters.length || 0;
    if (typeArguments.length !== typeParametersCount)
      throw Error("type parameter count mismatch")

    const typeParametersMap: { [key: string]: Type } = {};
    let name = this.name;
    if (typeParametersCount) {
      const typeNames: string[] = new Array(typeParametersCount);
      for (let i = 0; i < typeParametersCount; ++i) {
        const parameter = (<typescript.NodeArray<typescript.TypeParameterDeclaration>>this.declaration.typeParameters)[i];
        const type = compiler.resolveType(typeArguments[i]);
        typeParametersMap[(<ts.Identifier>parameter.name).getText()] = type;
        typeNames[i] = type.toString();
      }
      name += "<" + typeNames.join(",") + ">";
    }

    return this.instances[name] || (this.instances[name] = new Class(name, this.declaration, compiler.uintptrType, typeParametersMap));
  }
}
