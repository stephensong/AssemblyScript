/**
 * Reflection components representing the WebAssembly output.
 * @module assemblyscript/reflection
 * @preferred
 */ /** */

export * from "./reflection/class";
export * from "./reflection/enum";
export * from "./reflection/function";
export * from "./reflection/property";
export * from "./reflection/type";
export * from "./reflection/variable";

import * as reflection from "./reflection";

/** Union type of concrete reflection objects. */
export type Object = reflection.Variable | reflection.Enum | reflection.Function | reflection.FunctionTemplate | reflection.Class | reflection.ClassTemplate;

/** Filter flags for resolving specific reflection objects only. */
export enum ObjectFlags {

  /** Accept variables. */
  Variable = 1 << 0,
  /** Accept enums. */
  Enum = 1 << 1,
  /** Accept class instances. */
  Class = 1 << 2,
  /** Accept class templates.  */
  ClassTemplate = 1 << 3,
  /** Accept function instances. */
  Function = 1 << 4,
  /** Accept function templates. */
  FunctionTemplate = 1 << 5,

  /** Accepts function instances and templates. */
  FunctionInclTemplate = ObjectFlags.Function | ObjectFlags.FunctionTemplate,
  /** Accepts class instances and templates. */
  ClassInclTemplate = ObjectFlags.Class | ObjectFlags.ClassTemplate,
  /** Accepts any valid property parent. */
  AnyPropertyParent = ObjectFlags.Enum | ObjectFlags.Class,

  /** Accepts any reflection object. */
  Any = -1
}
