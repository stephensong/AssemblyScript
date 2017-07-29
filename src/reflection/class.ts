/** @module assemblyscript/reflection */ /** */

import Compiler from "../compiler";
import { FunctionTemplate, Function } from "./function";
import Property from "./property";
import { Type, TypeArgumentsMap, voidType } from "./type";
import * as typescript from "../typescript";
import * as util from "../util";

/** Common base class of {@link Class} and {@link ClassTemplate}. */
export abstract class ClassBase {

  /** Compiler reference. */
  compiler: Compiler;
  /** Global name. */
  name: string;
  /** Simple name. */
  simpleName: string;
  /** Declaration reference. */
  declaration: typescript.ClassDeclaration;

  protected constructor(compiler: Compiler, name: string, declaration: typescript.ClassDeclaration) {
    this.compiler = compiler;
    this.name = name;
    this.declaration = declaration;

    const p = name.lastIndexOf("/");
    this.simpleName = p > -1 ? name.substring(p + 1) : name;
  }

  /** Tests if this class is generic. */
  get isGeneric(): boolean { return !!(this.declaration.typeParameters && this.declaration.typeParameters.length); }

  /** Tests if this class is exported. */
  get isExport(): boolean { return util.isExport(this.declaration) && typescript.getSourceFileOfNode(this.declaration) === this.compiler.entryFile; }

  /** Tests if this class has been annotated with a decorator of the specified name. */
  hasDecorator(name: string): boolean {
    const decorators = this.declaration.decorators;
    if (decorators) {
      for (let i = 0, k = decorators.length; i < k; ++i) {
        const decorator = decorators[i];
        if (
          decorator.expression.kind === typescript.SyntaxKind.CallExpression &&
          (<typescript.CallExpression>decorator.expression).expression.kind === typescript.SyntaxKind.Identifier &&
          (<typescript.Identifier>(<typescript.CallExpression>decorator.expression).expression).text === name
        )
          return true;
      }
    }
    return false;
  }

  toString(): string { return this.name; }
}

/** Interface describing a reflected class method. */
export interface ClassMethod {
  /** Class template with possibly unresolved type parameters. */
  template: FunctionTemplate;
  /** Class instance with type parameters resolved, if initialized yet. */
  instance?: Function;
}

/** Tests if the specified global name references a built-in array. */
export function isBuiltinArray(globalName: string) {
  return /^assembly\.d\.ts\/Array<|^std\/array\.ts\/Array</.test(globalName);
}

/** Tests if the specified global name references a built-in string. */
export function isBuiltinString(globalName: string) {
  return globalName === "assembly.d.ts/String";
}

/** A class handle consisting of its instance, if any, and its template. */
export interface ClassHandle {
  template: ClassTemplate;
  instance?: Class;
}

/** A class instance with generic parameters resolved. */
export class Class extends ClassBase {

  /** Corresponding class template. */
  template: ClassTemplate;
  /** Reflected class type. */
  type: Type;
  /** Concrete type arguments. */
  typeArguments: typescript.TypeNode[];
  /** Type arguments map. */
  typeArgumentsMap: TypeArgumentsMap;
  /** Base class, if any. */
  base?: Class;
  /** Static and instance class properties. */
  properties: { [key: string]: Property } = {};
  /** Static and instance class methods. */
  methods: { [key: string]: ClassMethod } = {};
  /** Getter methods. */
  getters: { [key: string]: ClassMethod } = {};
  /** Setter methods. */
  setters: { [key: string]: ClassMethod } = {};
  /** Class constructor, if any. */
  ctor?: Function;
  /** Size in memory, in bytes. */
  size: number = 0;
  /** Whether array access is supported on this class. */
  isArray: boolean = false;
  /** Whether this is a string-like class. */
  isString: boolean = false;
  /** Whether memory must be allocated implicitly. */
  implicitMalloc: boolean = false;

  /** Constructs a new reflected class and binds it to its TypeScript declaration. */
  constructor(compiler: Compiler, name: string, template: ClassTemplate, typeArguments: typescript.TypeNode[] , base?: Class) {
    super(compiler, name, template.declaration);

    // register
    if (compiler.classes[this.name])
      throw Error("duplicate class instance: " + this.name);
    compiler.classes[this.name] = template.instances[this.name] = this;
    if (!this.isGeneric) util.setReflectedClass(template.declaration, this);

    // initialize
    this.template = template;
    this.type = compiler.uintptrType.withUnderlyingClass(this);
    this.typeArguments = typeArguments;
    this.typeArgumentsMap = compiler.resolveTypeArgumentsMap(typeArguments, this.declaration, base && base.typeArgumentsMap);
    this.base = base;

    if (isBuiltinArray(this.name) || (!!this.base && this.base.isArray))
      this.isArray = true;

    if (isBuiltinString(this.name) || (!!this.base && this.base.isString))
      this.isString = true;

    this.implicitMalloc = !this.hasDecorator("no_implicit_malloc");

    // inherit from base class
    if (this.base) {
      this.properties = Object.create(this.base.properties);
      this.size = this.base.size;
      this.methods = Object.create(this.base.methods);
      this.getters = Object.create(this.base.getters);
      this.setters = Object.create(this.base.setters);
    }

    // set up properties - TODO: Investigate impact of dense unaligned properties (that's the case currently)
    Object.keys(this.template.propertyDeclarations).forEach(propertyName => {
      const propertyDeclaration = this.template.propertyDeclarations[propertyName];
      if (propertyDeclaration.type) {
        const propertyType = this.compiler.resolveType(propertyDeclaration.type);
        if (propertyType) {
          this.properties[propertyName] = new Property(this.compiler, propertyName, propertyDeclaration, propertyType, this.size, propertyDeclaration.initializer);
          if (util.isStatic(propertyDeclaration))
            this.compiler.addGlobal(this.name + "." + propertyName, propertyType, true, propertyDeclaration.initializer);
          else
            this.size += propertyType.size;
        } // otherwise reported by resolveType
      } else
        this.compiler.report(propertyDeclaration.name, typescript.DiagnosticsEx.Type_expected);
    });

    // set up methods
    Object.keys(this.template.methodDeclarations).forEach(methodName => {
      const methodDeclaration = this.template.methodDeclarations[methodName];
      const hasBody = !!methodDeclaration.body;
      if (!hasBody && this.base && this.base.methods[methodName])
        this.methods[methodName] = this.base.methods[methodName];
      else
        this.methods[methodName] = util.isStatic(methodDeclaration)
          ? this.compiler.initializeStaticMethod(methodDeclaration)
          : this.methods[methodName] = this.compiler.initializeInstanceMethod(methodDeclaration, this);
    });

    // set up getters
    Object.keys(this.template.getterDeclarations).forEach(getterName => {
      const getterDeclaration = this.template.getterDeclarations[getterName];
      this.getters[getterName] = util.isStatic(getterDeclaration)
        ? this.compiler.initializeStaticMethod(getterDeclaration)
        : this.compiler.initializeInstanceMethod(getterDeclaration, this);
    });

    // set up setters
    Object.keys(this.template.setterDeclarations).forEach(setterName => {
      const setterDeclaration = this.template.setterDeclarations[setterName];
      this.setters[setterName] = util.isStatic(setterDeclaration)
        ? this.compiler.initializeStaticMethod(setterDeclaration)
        : this.compiler.initializeInstanceMethod(setterDeclaration, this);
    });

    // set up constructor
    const ctorDeclaration = this.template.ctorDeclaration;
    if (ctorDeclaration) {
      const localInitializers: number[] = [];
      for (let j = 0, l = ctorDeclaration.parameters.length; j < l; ++j) {
        const parameterNode = ctorDeclaration.parameters[j];
        if (parameterNode.modifiers && parameterNode.modifiers.length) {
          const propertyName = typescript.getTextOfNode(parameterNode.name);
          if (parameterNode.type) {
            const propertyType = this.compiler.resolveType(parameterNode.type);
            if (propertyType) {
              this.properties[propertyName] = new Property(this.compiler, propertyName, /* FIXME */<typescript.PropertyDeclaration><any>parameterNode, propertyType, this.size);
              localInitializers.push(j);
              this.size += propertyType.size;
            } // otherwise reported by resolveType
          } else
            this.compiler.report(parameterNode, typescript.DiagnosticsEx.Type_expected);
        }
      }
      const ctor = this.compiler.initializeInstanceMethod(ctorDeclaration, this);
      this.ctor = ctor.instance;
      if (!this.ctor)
        this.ctor = util.getReflectedFunction(ctorDeclaration);
      if (!this.ctor)
        this.ctor = ctor.template.resolve([], this.typeArgumentsMap);
      for (let j = 0, l = localInitializers.length; j < l; ++j)
        this.ctor.parameters[localInitializers[j]].isAlsoProperty = true;
    }
  }

  /** Tests if this class extends another class. */
  extends(base: Class): boolean {
    let current = this.base;
    while (current) {
      if (current === base)
        return true;
      current = current.base;
    }
    return false;
  }

  /** Tests if this class is assignable to the specified (class) type. */
  isAssignableTo(type: Class): boolean {
    return this === type || this.extends(type);
  }
}

export { Class as default };

/** A class template with possibly unresolved generic parameters. */
export class ClassTemplate extends ClassBase {

  /** Class instances by global name. */
  instances: { [key: string]: Class } = {};
  /** Base class template, if any. */
  base?: ClassTemplate;
  /** Base type arguments. */
  baseTypeArguments: typescript.TypeNode[];
  /** Static and instance class property declarations by simple name. */
  propertyDeclarations: { [key: string]: typescript.PropertyDeclaration } = {};
  /** Static and instance method declarations by simple name. */
  methodDeclarations: { [key: string]: typescript.MethodDeclaration; } = {};
  /** Getter declarations by simple name. */
  getterDeclarations: { [key: string]: typescript.MethodDeclaration; } = {};
  /** Setter declarations by simple name. */
  setterDeclarations: { [key: string]: typescript.MethodDeclaration; } = {};
  /** Constructor declaration, if any. */
  ctorDeclaration?: typescript.ConstructorDeclaration;

  /** Constructs a new reflected class template and binds it to its declaration. */
  constructor(compiler: Compiler, name: string, declaration: typescript.ClassDeclaration, base?: ClassTemplate, baseTypeArguments?: typescript.TypeNode[]) {
    super(compiler, name, declaration);

    if (base && !baseTypeArguments)
      throw Error("missing base type arguments"); // handled by typescript

    // register (without appended genertic types)
    if (compiler.classes[this.name])
      throw Error("duplicate class template: " + this.name);
    compiler.classTemplates[this.name] = this;
    util.setReflectedClassTemplate(this.declaration, this);

    // initialize
    this.base = base;
    this.baseTypeArguments = baseTypeArguments || [];

    // append generic type parameters to internal name
    if (declaration.typeParameters && declaration.typeParameters.length) {
      const typeNames: string[] = new Array(declaration.typeParameters.length);
      for (let i = 0; i < declaration.typeParameters.length; ++i)
        typeNames[i] = typescript.getTextOfNode(declaration.typeParameters[i].name);
      this.name += "<" + typeNames.join(",") + ">";
    }

    // populate declarations
    for (let i = 0, k = this.declaration.members.length; i < k; ++i) {
      const member = this.declaration.members[i];
      switch (member.kind) {

        case typescript.SyntaxKind.PropertyDeclaration: {
          const propertyDeclaration = <typescript.PropertyDeclaration>member;
          const propertyName = typescript.getTextOfNode(propertyDeclaration.name);
          if (this.propertyDeclarations[propertyName])
            throw Error("duplicate property declaration '" + propertyName + "' in " + this);
          this.propertyDeclarations[propertyName] = propertyDeclaration;
          break;
        }
        case typescript.SyntaxKind.MethodDeclaration: {
          const methodDeclaration = <typescript.MethodDeclaration>member;
          const methodName = typescript.getTextOfNode(methodDeclaration.name);
          if (this.methodDeclarations[methodName])
            throw Error("duplicate method declaration '" + methodName + "' in " + this);
          this.methodDeclarations[methodName] = methodDeclaration;
          break;
        }
        case typescript.SyntaxKind.GetAccessor: {
          const getterDeclaration = <typescript.MethodDeclaration>member;
          const getterName = typescript.getTextOfNode(getterDeclaration.name);
          if (this.getterDeclarations[getterName])
            throw Error("duplicate getter declaration '" + getterName + "' in " + this);
          this.getterDeclarations[getterName] = getterDeclaration;
          break;
        }
        case typescript.SyntaxKind.SetAccessor: {
          const setterDeclaration = <typescript.MethodDeclaration>member;
          const setterName = typescript.getTextOfNode(setterDeclaration.name);
          if (this.setterDeclarations[setterName])
            throw Error("duplicate setter declaration '" + setterName + "' in " + this);
          this.setterDeclarations[setterName] = setterDeclaration;
          break;
        }
        case typescript.SyntaxKind.Constructor: {
          const ctorDeclaration = <typescript.ConstructorDeclaration>member;
          if (this.ctorDeclaration)
            throw Error("duplicate constructor declaration in " + this);
          this.ctorDeclaration = ctorDeclaration;
          break;
        }
        default:
          this.compiler.report(member, typescript.DiagnosticsEx.Unsupported_node_kind_0_in_1, member.kind, "reflection.ClassTemplate#constructor");
      }
    }
  }

  /** Resolves this possibly generic class against the provided type arguments. */
  resolve(typeArgumentNodes: typescript.TypeNode[], typeArgumentsMap?: TypeArgumentsMap): Class {

    // validate number of type parameters
    const typeParametersCount = this.declaration.typeParameters && this.declaration.typeParameters.length || 0;
    if (typeArgumentNodes.length !== typeParametersCount)
      throw Error("type parameter count mismatch: expected "+ typeParametersCount + " but saw " + typeArgumentNodes.length);

    // replace type parameters with their actual types in internal name
    let name = this.name.replace(/<.*$/, "");
    const typeArguments: TypeArgumentsMap = {};
    if (typeParametersCount) {
      const resolvedTypeNames: string[] = new Array(typeParametersCount);
      for (let i = 0; i < typeParametersCount; ++i) {
        const parameter = (<typescript.NodeArray<typescript.TypeParameterDeclaration>>this.declaration.typeParameters)[i];
        const parameterType = this.compiler.resolveType(typeArgumentNodes[i], false, typeArgumentsMap) || voidType; // reports
        const parameterName = typescript.getTextOfNode(<typescript.Identifier>parameter.name);
        typeArguments[parameterName] = {
          type: parameterType,
          node: typeArgumentNodes[i]
        };
        resolvedTypeNames[i] = parameterType.toString();
      }
      name += "<" + resolvedTypeNames.join(",") + ">";
    }

    let instance = this.instances[name];
    if (!instance) {
      // resolve base type arguments against current type arguments
      let base: Class | undefined;
      if (this.base) {
        const baseTypeArgumentNodes: typescript.TypeNode[] = [];
        for (let i = 0; i < (<typescript.TypeNode[]>this.baseTypeArguments).length; ++i) {
          const argument = (<typescript.TypeNode[]>this.baseTypeArguments)[i];
          const argumentName = typescript.getTextOfNode(argument);
          baseTypeArgumentNodes[i] = typeArguments[argumentName] ? typeArguments[argumentName].node : argument;
        }
        base = this.base.resolve(baseTypeArgumentNodes);
      }
      instance = new Class(this.compiler, name, this, typeArgumentNodes, base);
    }
    return instance;
  }
}

/** Patches a declaration to inherit from its actual implementation. */
export function patchClassImplementation(declTemplate: ClassTemplate, implTemplate: ClassTemplate): void {
  const compiler = implTemplate.compiler;

  if (compiler !== declTemplate.compiler)
    throw Error("compiler mismatch");

  // Make the declaration extend the implementation. New instances will automatically inherit this change from the template.
  implTemplate.base = declTemplate.base; // overrides inheritance from declaration
  declTemplate.base = implTemplate;
  if (implTemplate.declaration.typeParameters) {
    for (let i = 0, k = implTemplate.declaration.typeParameters.length; i < k; ++i) {
      const parameter = implTemplate.declaration.typeParameters[i];
      declTemplate.baseTypeArguments.push(<typescript.TypeNode><any>parameter); // solely used to obtain a name
    }
  }

  // patch existing instances
  for (let keys = Object.keys(declTemplate.instances), i = 0, k = keys.length; i < k; ++i) {
    const declInstance = declTemplate.instances[keys[i]];
    const implInstance = implTemplate.resolve(Object.keys(declInstance.typeArgumentsMap).map(key => declInstance.typeArgumentsMap[key].node));

    implInstance.base = declInstance.base;
    declInstance.base = implInstance;

    // replace already initialized class instance methods with their actual implementations
    for (let mkeys = Object.keys(declInstance.methods), j = 0, l = mkeys.length; j < l; ++j) {
      const declMethod = declInstance.methods[mkeys[j]];
      const implMethod = implInstance.methods[mkeys[j]];

      if (!implMethod)
        throw Error("missing implementation of '" + mkeys[j] + "' in " + implInstance + " as declared in " + declInstance);

      // the following assumes that methods haven't been compiled yet
      declTemplate.methodDeclarations[mkeys[j]] = implTemplate.methodDeclarations[mkeys[j]];
      declInstance.methods[mkeys[j]] = implMethod;

      util.setReflectedFunctionTemplate(declMethod.template.declaration, implMethod.template);
      if (implMethod.instance && !implMethod.instance.isGeneric)
        util.setReflectedFunction(declMethod.template.declaration, implMethod.instance);
    }
  }

  // remove 'export' modifier from implementation (parent) so std classes are not actually exported
  util.removeModifier(implTemplate.declaration, typescript.SyntaxKind.ExportKeyword, true);
}
