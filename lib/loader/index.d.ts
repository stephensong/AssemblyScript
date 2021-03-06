/// <reference types="webassembly-js-api" />

import * as Long from "long";

/** Options to set up the environment created by {@link load}. */
export interface ILoadOptions {
  /** Memory instance to import, if applicable. */
  memory?: WebAssembly.Memory;
  /** Imported elements. Usually functions. */
  imports?: { [key: string]: any }
}

/** Number memory accessor. */
export interface INumberMemoryAccessor {
  /** Gets a value of the underlying type from memory at the specified pointer. */
  get(ptr: number): number;
  /** Sets a value of the underlying type in memory at the specified pointer. */
  set(ptr: number, value: number): void;
}

/** Long memory accessor. */
export interface ILongMemoryAccessor {
  /** Gets a Long from memory at the specified pointer. */
  get(ptr: number): Long;
  /** Sets a Long in memory at the specified pointer. */
  set(ptr: number, value: Long): void;
}

/** Array memory accessor. */
export interface IArrayMemoryAccessor {
  /** Gets an array from memory at the specified pointer and returns its capacity, length and element base pointer. */
  get(ptr: number): { capacity: number, length: number, base: number };
  /** Creates an array in memory and returns its pointer and element base pointer. */
  create(length: number, elementByteSize: number): { ptr: number, base: number };
}

/** String memory accessor. */
export interface IStringMemoryAccessor {
  /** Gets a string from memory at the specified pointer. */
  get(ptr: number): string;
  /** Creates a string in memory and returns its pointer. */
  create(value: string): number;
}

/** Log message type. */
export enum LogType {
  LOG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

/** Common module interface as returned by {@link load}. */
export interface IModule {

  /** A reference to the underlying memory instance. */
  memory: WebAssembly.Memory;
  /** An unsigned byte view on the underlying memory. Note that this view is updated when memory grows, hence make sure to always access it on the module instance directly. */
  buffer: Uint8Array;
  /** Imported elements. Usually functions. */
  imports: { [key: string]: any };
  /** Exported elements. Usually functions. */
  exports: { [key: string]: any };

  /** Gets the current size of the memory in 64kb pages. */
  currentMemory(): number;
  /** Grows the memory by the specified number of 64kb pages. */
  growMemory(numPages: number): number;
  /** An overridable function called for each log message. */
  log(type: LogType, message: string): void;

  /** Signed 8-bit integer accessors. */
  sbyte: INumberMemoryAccessor;
  /** Signed 8-bit integer accessors. Alias of `sbyte`. */
  s8: INumberMemoryAccessor;

  /** Unsigned 8-bit integer accessors. */
  byte: INumberMemoryAccessor;
  /** Unsigned 8-bit integer accessors. Alias of `byte`. */
  u8: INumberMemoryAccessor;

  /** Signed 16-bit integer accessors. */
  short: INumberMemoryAccessor;
  /** Signed 16-bit integer value accessors. Alias of `short`. */
  s16: INumberMemoryAccessor;

  /** Unsigned 16-bit integer accessors. */
  ushort: INumberMemoryAccessor;
  /** Unsigned 16-bit integer accessors. Alias of `ushort`. */
  u16: INumberMemoryAccessor;

  /** Signed 32-bit integer accessors. */
  int: INumberMemoryAccessor;
  /** Signed 32-bit integer accessors. Alias of `int`. */
  s32: INumberMemoryAccessor;

  /** Unsigned 32-bit integer accessors. */
  uint: INumberMemoryAccessor;
  /** Unsigned 32-bit integer accessors. Alias of `uint`. */
  u32: INumberMemoryAccessor;

  /** Signed 64-bit integer accessors. */
  long: ILongMemoryAccessor;
  /** Signed 64-bit integer accessors. Alias of `long`. */
  s64: ILongMemoryAccessor;

  /** Unsigned 64-bit integer accessors. */
  ulong: ILongMemoryAccessor;
  /** Unsigned 64-bit integer accessors. Alias of `ulong`. */
  u64: ILongMemoryAccessor;

  /** 32-bit float accessors. */
  float: INumberMemoryAccessor;
  /** 32-bit float accessors. Alias of `float`. */
  f32: INumberMemoryAccessor;

  /** 64-bit float accessors. */
  double: INumberMemoryAccessor;
  /** 64-bit float accessors. Alias of `double`. */
  f64: INumberMemoryAccessor;

  /** Array accessors. */
  array: IArrayMemoryAccessor;

  /** String accessors. */
  string: IStringMemoryAccessor;
}

/** Loads a WebAssembly module either from a buffer or from a file and returns a promise for an {@link IModule}. */
export function load(file: ArrayBuffer | Uint8Array | string, options?: ILoadOptions): Promise<IModule>;

export { load as default };
