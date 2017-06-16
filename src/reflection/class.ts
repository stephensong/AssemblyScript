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

  toString(): string { return this.name; }
}

/** A class instance with generic parameters resolved. */
export class Class extends ClassBase {
  type: Type;
  typeParameterTypes: Type[];
  typeParametersMap: { [key: string]: Type };
  base?: Class;

  initialized: boolean = false;
  properties: { [key: string]: Property } = {};
  ctor?: Function;
  size: number = 0;

  constructor(name: string, declaration: typescript.ClassDeclaration, uintptrType: Type, typeParametersMap: { [key: string]: Type }, base?: Class) {
    super(name, declaration);
    this.type = uintptrType.withUnderlyingClass(this);
    this.typeParametersMap = typeParametersMap;
    this.typeParameterTypes = Object.keys(this.typeParametersMap).map(key => typeParametersMap[key]);
    this.base = base;
  }

  // TODO
  get isArray(): boolean { return typescript.getTextOfNode(<typescript.Identifier>this.declaration.name) === "Array"; }

  initialize(compiler: Compiler): void {
    if (this.initialized)
      return;

    // Inherit from base class
    if (this.base) {
      this.base.initialize(compiler);
      for (let keys = Object.keys(this.base.properties), i = 0; i < keys.length; ++i)
        this.properties[keys[i]] = this.base.properties[keys[i]];
      this.size = this.base.size;
      // methods are handled by TypeScript
    }

    // TODO: Investigate impact of dense unaligned properties in memory (that's the case currently)
    for (let i = 0, k = this.declaration.members.length; i < k; ++i) {
      const member = this.declaration.members[i];
      switch (member.kind) {

        case typescript.SyntaxKind.PropertyDeclaration:
        {
          const propertyNode = <typescript.PropertyDeclaration>member;
          if (propertyNode.type) {
            const name = typescript.getTextOfNode(propertyNode.name);
            const type = compiler.resolveType(propertyNode.type);
            if (type) {
              this.properties[name] = new Property(name, <typescript.PropertyDeclaration>member, type, this.size);
              this.size += type.size;
            } else
              compiler.error(propertyNode.type, "Unresolvable type");
          } else
            compiler.error(propertyNode, "Type expected");
          break;
        }

        case typescript.SyntaxKind.Constructor:
        {
          // TODO: super - or is this managed by ts?
          const constructorNode = <typescript.ConstructorDeclaration>member;
          const localInitializers: number[] = [];
          for (let j = 0, l = constructorNode.parameters.length; j < l; ++j) {
            const parameterNode = constructorNode.parameters[j];
            if (parameterNode.modifiers && parameterNode.modifiers.length) {
              const name = typescript.getTextOfNode(parameterNode.name);
              const type = compiler.resolveType(<typescript.TypeNode>parameterNode.type);
              if (type) {
                this.properties[name] = new Property(name, /* works, somehow: */ <typescript.PropertyDeclaration>member, type, this.size);
                localInitializers.push(j);
                this.size += type.size;
              } else {
                compiler.error(parameterNode, "Unresolvable type");
              }
            }
          }
          compiler.initializeFunction(constructorNode);
          this.ctor = typescript.getReflectedFunction(constructorNode);
          for (let j = 0, l = localInitializers.length; j < l; ++j)
            this.ctor.parameters[localInitializers[j]].isAlsoProperty = true;
          break;
        }

        case typescript.SyntaxKind.MethodDeclaration:
          compiler.initializeFunction(<typescript.MethodDeclaration>member);
          break;

        default:
          compiler.error(member, "Unsupported class member");
      }
    }
    this.initialized = true;
  }
}

export { Class as default };

/** A class template with possibly unresolved generic parameters. */
export class ClassTemplate extends ClassBase {
  instances: { [key: string]: Class } = {};
  base?: ClassTemplate;
  baseTypeArguments?: typescript.TypeNode[];

  constructor(name: string, declaration: typescript.ClassDeclaration, base?: ClassTemplate, baseTypeArguments?: typescript.TypeNode[]) {
    super(name, declaration);
    if (base && !baseTypeArguments)
      throw Error("missing base type arguments");
    this.base = base;
    this.baseTypeArguments = baseTypeArguments;
  }

  get isGeneric(): boolean { return !!(this.declaration.typeParameters && this.declaration.typeParameters.length); }

  resolve(compiler: Compiler, typeArguments: typescript.TypeNode[]): Class {
    const typeParametersCount = this.declaration.typeParameters && this.declaration.typeParameters.length || 0;
    if (typeArguments.length !== typeParametersCount)
      throw Error("type parameter count mismatch");

    let name = this.name;
    const typeNodeParametersMap: { [key: string]: typescript.TypeNode } = {};
    const typeParametersMap: { [key: string]: Type } = {};
    if (typeParametersCount) {
      const typeNames: string[] = new Array(typeParametersCount);
      for (let i = 0; i < typeParametersCount; ++i) {
        const parameter = (<typescript.NodeArray<typescript.TypeParameterDeclaration>>this.declaration.typeParameters)[i];
        const parameterType = compiler.resolveType(typeArguments[i]);
        const parameterName = typescript.getTextOfNode(<typescript.Identifier>parameter.name);
        typeNodeParametersMap[name] = typeArguments[i];
        typeParametersMap[parameterName] = parameterType;
        typeNames[i] = parameterType.toString();
      }
      name += "<" + typeNames.join(",") + ">";
    }

    if (this.instances[name])
      return this.instances[name];

    // Resolve base type arguments against current type arguments
    let base: Class | undefined;
    if (this.base) {
      const baseTypeArguments: typescript.TypeNode[] = [];
      for (let i = 0; i < (<typescript.TypeNode[]>this.baseTypeArguments).length; ++i) {
        const argument = (<typescript.TypeNode[]>this.baseTypeArguments)[i];
        const argumentName = typescript.getTextOfNode(argument);
        baseTypeArguments[i] = typeNodeParametersMap[argumentName] || argument;
      }
      base = this.base.resolve(compiler, baseTypeArguments);
    }

    return this.instances[name] = new Class(name, this.declaration, compiler.uintptrType, typeParametersMap, base);
  }
}
