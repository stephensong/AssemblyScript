import Compiler from "../compiler";
import { FunctionTemplate, Function } from "./function";
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

export interface TypeArgument {
  type: Type;
  node: typescript.TypeNode;
}

/** A class instance with generic parameters resolved. */
export class Class extends ClassBase {
  type: Type;
  typeArguments: { [key: string]: TypeArgument};
  base?: Class;

  initialized: boolean = false;
  properties: { [key: string]: Property } = {};
  methods: { [key: string]: { template: FunctionTemplate, instance?: Function } } = {};
  ctor?: Function;
  size: number = 0;

  isArray: boolean = false;
  isString: boolean = false;

  constructor(name: string, declaration: typescript.ClassDeclaration, uintptrType: Type, typeArguments: { [key: string]: TypeArgument } , base?: Class) {
    super(name, declaration);
    this.type = uintptrType.withUnderlyingClass(this);
    this.typeArguments = typeArguments;
    this.base = base;
    typescript.setReflectedClass(declaration, this);

    if (/^assembly\.d\.ts\/Array<|^std\/array\.ts\/ArrayImpl</.test(this.name) || (!!this.base && this.base.isArray))
      this.isArray = true;
    if (this.name === "assembly.d.ts/String" || (!!this.base && this.base.isString))
      this.isString = true;
  }

  initialize(compiler: Compiler): void {
    if (this.initialized)
      return;

    this.size = 0;

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
          // 'super' is managed by TypeScript
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
          this.initializeMethod(compiler, <typescript.MethodDeclaration>member);
          break;

        default:
          compiler.error(member, "Unsupported class member");
      }
    }
    this.initialized = true;
  }

  initializeMethod(compiler: Compiler, node: typescript.MethodDeclaration) {
    const simpleName = typescript.getTextOfNode(node.name);
    const hasBody = !!node.body;
    if (!hasBody && this.base && this.base.methods[simpleName])
      this.methods[simpleName] = this.base.methods[simpleName];
    else
      this.methods[simpleName] = compiler.initializeFunction(node);
  }
}

export { Class as default };

/** A class template with possibly unresolved generic parameters. */
export class ClassTemplate extends ClassBase {
  instances: { [key: string]: Class } = {};
  base?: ClassTemplate;
  baseTypeArguments: typescript.TypeNode[];

  constructor(name: string, declaration: typescript.ClassDeclaration, base?: ClassTemplate, baseTypeArguments?: typescript.TypeNode[]) {
    super(name, declaration);
    if (base && !baseTypeArguments)
      throw Error("missing base type arguments");
    this.base = base;
    this.baseTypeArguments = baseTypeArguments || [];
    typescript.setReflectedClassTemplate(declaration, this);
  }

  get isGeneric(): boolean { return !!(this.declaration.typeParameters && this.declaration.typeParameters.length); }

  resolve(compiler: Compiler, typeArgumentNodes: typescript.TypeNode[]): Class {
    const typeParametersCount = this.declaration.typeParameters && this.declaration.typeParameters.length || 0;
    if (typeArgumentNodes.length !== typeParametersCount)
      throw Error("type parameter count mismatch: expected "+ typeParametersCount + " but saw " + typeArgumentNodes.length);

    let name = this.name;
    const typeArguments: { [key: string]: TypeArgument } = {};
    if (typeParametersCount) {
      const typeNames: string[] = new Array(typeParametersCount);
      for (let i = 0; i < typeParametersCount; ++i) {
        const parameter = (<typescript.NodeArray<typescript.TypeParameterDeclaration>>this.declaration.typeParameters)[i];
        const parameterType = compiler.resolveType(typeArgumentNodes[i]);
        const parameterName = typescript.getTextOfNode(<typescript.Identifier>parameter.name);
        typeArguments[parameterName] = {
          type: parameterType,
          node: typeArgumentNodes[i]
        };
        typeNames[i] = parameterType.toString();
      }
      name += "<" + typeNames.join(",") + ">";
    }

    if (this.instances[name])
      return this.instances[name];

    // Resolve base type arguments against current type arguments
    let base: Class | undefined;
    if (this.base) {
      const baseTypeArgumentNodes: typescript.TypeNode[] = [];
      for (let i = 0; i < (<typescript.TypeNode[]>this.baseTypeArguments).length; ++i) {
        const argument = (<typescript.TypeNode[]>this.baseTypeArguments)[i];
        const argumentName = typescript.getTextOfNode(argument);
        baseTypeArgumentNodes[i] = typeArguments[argumentName] ? typeArguments[argumentName].node : argument;
      }
      base = this.base.resolve(compiler, baseTypeArgumentNodes);
    }

    return this.instances[name] = new Class(name, this.declaration, compiler.uintptrType, typeArguments, base);
  }
}

/** Patches a @__impl-annotated declaration to inherit from its actual implementation. */
export function patchClassImplementation(compiler: Compiler, declTemplate: ClassTemplate, implTemplate: ClassTemplate): void {

  // Make the declaration and extend the implementation. New instances will automatically inherit this change from the template.
  implTemplate.base = declTemplate.base; // overrides inheritance from declaration
  declTemplate.base = implTemplate;
  if (implTemplate.declaration.typeParameters) {
    for (let i = 0, k = implTemplate.declaration.typeParameters.length; i < k; ++i) {
      const parameter = implTemplate.declaration.typeParameters[i];
      declTemplate.baseTypeArguments.push(<typescript.TypeNode><any>parameter); // solely used to obtain a name
    }
  }

  // Patch existing instances.
  for (let keys = Object.keys(declTemplate.instances), i = 0, k = keys.length; i < k; ++i) {
    const declInstance = declTemplate.instances[keys[i]];
    const implInstance = implTemplate.resolve(compiler, Object.keys(declInstance.typeArguments).map(key => declInstance.typeArguments[key].node ));

    implInstance.initialize(compiler);

    implInstance.base = declInstance.base;
    declInstance.base = implInstance;

    // Replace already initialized class instance methods with their actual implementations
    for (let mkeys = Object.keys(declInstance.methods), j = 0, l = mkeys.length; j < l; ++j) {
      const declMethod = declInstance.methods[mkeys[j]];
      const implMethod = implInstance.methods[mkeys[j]];
      if (implMethod) {
        typescript.setReflectedFunctionTemplate(declMethod.template.declaration, implMethod.template);
        if (implMethod.instance)
          typescript.setReflectedFunction(declMethod.template.declaration, implMethod.instance);
      }
    }
  }
}
