/// <reference types="webassembly-js-api" />

/** Options to set up the environment created by {@link load}. */
export interface ILoadOptions {
  /** Initial size of the memory in 64kb pages. */
  initialMemory?: number;
  /** Maximum size of the memory in 64kb pages. */
  maximumMemory?: number;
  /** Import elements. Usually functions. */
  imports?: { [key: string]: any }
}

/** Number memory accessor. */
export interface INumberMemoryAccessor {
  /** Logarithmic alignment. */
  align: number;
  /** Gets a value from memory at the specified pointer. */
  get(ptr: number): number;
  /** Sets a value in memory at the specified pointer. */
  set(ptr: number, value: number): void;
}

/** Array memory accessor. */
export interface IArrayMemoryAccessor {
  /** Gets an array from memory at the specified pointer and returns its leength and element base pointer. */
  get(ptr: number): { length: number, base: number };
  /** Creates an array in memory and returns its pointer and element base pointer. */
  create(value: string): { ptr: number, base: number };
}

/** String memory accessor. */
export interface IStringMemoryAccessor {
  /** Gets a string from memory at the specified pointer. */
  get(ptr: number): string;
  /** Creates a string in memory and returns its pointer. */
  create(value: string): number;
}

/** Common module interface as returned by {@link load}. */
export interface IModule {

  /** A reference to the underlying memory instance. */
  memory: WebAssembly.Memory;
  /** An unsigned byte view on the underlying memory. */
  buffer: Uint8Array;
  /** Imported elements. Usually functions. */
  imports: { [key: string]: any };
  /** Exported elements. Usually functions. */
  exports: { [key: string]: any };

  /** Gets the current size of the memory in 64kb pages. */
  currentMemory(): number;
  /** Grows the memory by the specified number of 64kb pages. */
  growMemory(numPages: number): number;

  /** Signed 8-bit integer value accessors. */
  sbyte: INumberMemoryAccessor;
  /** Signed 8-bit integer value accessors. Alias of `sbyte`. */
  s8: INumberMemoryAccessor;

  /** Unsigned 8-bit integer value accessors. */
  byte: INumberMemoryAccessor;
  /** Unsigned 8-bit integer value accessors. Alias of `byte`. */
  u8: INumberMemoryAccessor;

  /** Signed 16-bit integer value accessors. */
  short: INumberMemoryAccessor;
  /** Signed 16-bit integer value accessors. Alias of `short`. */
  s16: INumberMemoryAccessor;

  /** Unsigned 16-bit integer value accessors. */
  ushort: INumberMemoryAccessor;
  /** Unsigned 16-bit integer value accessors. Alias of `ushort`. */
  u16: INumberMemoryAccessor;

  /** Signed 32-bit integer value accessors. */
  int: INumberMemoryAccessor;
  /** Signed 32-bit integer value accessors. Alias of `int`. */
  s32: INumberMemoryAccessor;

  /** Unsigned 32-bit integer value accessors. */
  uint: INumberMemoryAccessor;
  /** Unsigned 32-bit integer value accessors. Alias of `uint`. */
  u32: INumberMemoryAccessor;

  /** 32-bit float value accessors. */
  float: INumberMemoryAccessor;
  /** 32-bit float value accessors. Alias of `float`. */
  f32: INumberMemoryAccessor;

  /** 64-bit float value accessors. */
  double: INumberMemoryAccessor;
  /** 64-bit float value accessors. Alias of `double`. */
  f64: INumberMemoryAccessor;

  /** Array value accessors. */
  array: IArrayMemoryAccessor;

  /** String value accessors. */
  string: IStringMemoryAccessor;
}

/** Loads a WebAssembly module either from a buffer or from a file and returns a promise for an {@link IModule}. */
declare function load(file: ArrayBuffer | Uint8Array | string, options?: ILoadOptions): Promise<IModule>;

export = load;
