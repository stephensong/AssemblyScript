import * as binaryen from "../binaryen";
import { Type } from "./type";
import { Variable } from "./variable";

export enum FunctionFlags {
  none        = 0,
  import      = 1 << 0,
  export      = 1 << 1,
  instance    = 1 << 2,
  constructor = 1 << 3
}

export class FunctionBase {
  name: string;
  flags: FunctionFlags;

  constructor(name: string, flags: FunctionFlags) {
    this.name = name;
    this.flags = flags;
  }

  get isImport(): boolean { return (this.flags & FunctionFlags.import) !== 0; }
  get isExport(): boolean { return (this.flags & FunctionFlags.export) !== 0; }
  get isInstance(): boolean { return (this.flags & FunctionFlags.instance) !== 0; }
  get isConstructor(): boolean { return (this.flags & FunctionFlags.constructor) !== 0; }
}

export class Function extends FunctionBase {
  genericTypes: Type[];
  parameterTypes: Type[];
  returnType: Type;

  // compiler-specific
  locals: Variable[];
  signature: binaryen.Signature;
  signatureIdentifier: string;

  constructor(name: string, flags: FunctionFlags, genericTypes: Type[], parameterTypes: Type[], returnType: Type) {
    super(name, flags);
    this.genericTypes = genericTypes;
    this.parameterTypes = parameterTypes;
    this.returnType = returnType;
  }
}

export { Function as default };

export class FunctionPrototype extends FunctionBase {
  genericTypeNames: string[];
  parameterTypeNames: string[];
  returnTypeName: string;

  constructor(name: string, flags: FunctionFlags, genericTypeNames: string[], parameterTypeNames: string[], returnTypeName: string) {
    super(name, flags);
    this.genericTypeNames = genericTypeNames;
    this.parameterTypeNames = parameterTypeNames;
    this.returnTypeName = returnTypeName;
  }
}
