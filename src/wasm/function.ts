import { binaryen } from "../binaryen";
import { ReflectionObjectKind, ReflectionObject } from "./object";
import { Type } from "./type";
import { Variable } from "./variable";

export enum FunctionFlags {
  none        = 0,
  import      = 1 << 0,
  export      = 1 << 1,
  instance    = 1 << 2,
  constructor = 1 << 3
}

export class Function extends ReflectionObject {
  flags: FunctionFlags;
  locals: Variable[];
  signature: binaryen.Signature;
  signatureIdentifier: string;
  genericTypes: Type[];
  parameterTypes: Type[];
  returnType: Type;

  constructor(name: string, flags: FunctionFlags, genericTypes: Type[], parameterTypes: Type[], returnType: Type) {
    super(name, ReflectionObjectKind.Function);
    this.flags = flags;
    this.genericTypes = genericTypes;
    this.parameterTypes = parameterTypes;
    this.returnType = returnType;
  }
}
