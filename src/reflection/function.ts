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

export class Function {
  name: string;
  flags: FunctionFlags;
  genericTypes: Type[];
  parameterTypes: Type[];
  returnType: Type;

  // compiler-specific
  locals: Variable[];
  signature: binaryen.Signature;
  signatureIdentifier: string;

  constructor(name: string, flags: FunctionFlags, genericTypes: Type[], parameterTypes: Type[], returnType: Type) {
    this.name = name;
    this.flags = flags;
    this.genericTypes = genericTypes;
    this.parameterTypes = parameterTypes;
    this.returnType = returnType;
  }

  get isImport(): boolean { return (this.flags & FunctionFlags.import) !== 0; }
  get isExport(): boolean { return (this.flags & FunctionFlags.export) !== 0; }
  get isInstance(): boolean { return (this.flags & FunctionFlags.instance) !== 0; }
  get isConstructor(): boolean { return (this.flags & FunctionFlags.constructor) !== 0; }
}
