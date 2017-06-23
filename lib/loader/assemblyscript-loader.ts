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

/** Common module interface as returned by {@link load}. */
export interface IModule {
  /** A reference to the underlying memory instance. */
  memory: WebAssembly.Memory;
  /** Imported elements. Usually functions. */
  imports: { [key: string]: any };
  /** Exported elements. Usually functions. */
  exports: { [key: string]: any };
  /** An 8-bit signed integer view on the memory. */
  S8: Int8Array;
  /** An 8-bit unsigned integer view on the memory. */
  U8: Uint8Array;
  /** A 16-bit signed integer view on the memory. */
  S16: Int16Array;
  /** A 16-bit unsigned integer view on the memory. */
  U16: Uint16Array;
  /** A 32-bit signed integer view on the memory. */
  S32: Int32Array;
  /** A 32-bit unsigned integer view on the memory. */
  U32: Uint32Array;
  /** A 32-bit float view on the memory. */
  F32: Float32Array;
  /** A 64-bit float view on the memory. */
  F64: Float64Array;
  /** Gets the current size of the memory in 64kb pages. */
  currentMemory(): number;
  /** Grows the memory by the specified number of 64kb pages. */
  growMemory(numPages: number): number;
}

/** Loads a WebAssembly module either from a buffer or from a file and returns a promise for an {@link IModule}. */
export function load(file: ArrayBuffer | Uint8Array | string, options?: ILoadOptions): Promise<IModule> {
  if (!options)
    options = {};

  let imports = options.imports || {};
  let memory = <WebAssembly.Memory>imports.memory;

  if (!memory)
    memory = new WebAssembly.Memory({
      initial: options.initialMemory || 256,
      maximum: options.maximumMemory || 4294967295
    });

  let module = <IModule>{
    memory: memory,
    imports: imports,
    exports: {},
    currentMemory: function currentMemory(): number {
      return this.memory.buffer.byteLength >>> 16;
    },
    growMemory: function growMemory(numPages: number): number {
      let previousPages = this.memory.grow(numPages);
      onGrowMemory();
      return previousPages;
    }
  };

  function onGrowMemory() {
    module.S8 = new Int8Array(memory.buffer);
    module.U8 = new Uint8Array(memory.buffer);
    module.S16 = new Int16Array(memory.buffer);
    module.U16 = new Uint16Array(memory.buffer);
    module.S32 = new Int32Array(memory.buffer);
    module.U32 = new Uint32Array(memory.buffer);
    module.F32 = new Float32Array(memory.buffer);
    module.F64 = new Float64Array(memory.buffer);
  }

  imports.onGrowMemory = onGrowMemory;

  return (typeof file === "string"
    ? (typeof fetch === "function" && fetch || fetch_node)(file)
      .then((result: Response) => result.arrayBuffer())
      .then((buffer: ArrayBuffer) => WebAssembly.instantiate(buffer, imports))
    : WebAssembly.instantiate(<ArrayBuffer | Uint8Array>file, imports)
  )
  .then(result => {
    module.exports = result.instance.exports;
    onGrowMemory();
    return <IModule>module;
  });
}

var fs: any;
function fetch_node(file: string): Promise<Body> {
  return new Promise<Body>((resolve, reject) =>
    (fs || (fs = eval("equire".replace(/^/, "r"))("fs")))
    .readFile(file, (err: Error, data?: Buffer) => err
      ? reject(err)
      : resolve(<Body><any>{ arrayBuffer: () => data })
    )
  );
}

export { load as default };
