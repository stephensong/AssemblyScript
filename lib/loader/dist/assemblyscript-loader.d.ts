/// <reference types="webassembly-js-api" />
/** Options to set up the environment created by {@link load}. */
export interface ILoadOptions {
    /** Initial size of the memory in 64kb pages. */
    initialMemory?: number;
    /** Maximum size of the memory in 64kb pages. */
    maximumMemory?: number;
    /** Import elements. Usually functions. */
    imports?: {
        [key: string]: any;
    };
}
/** Common module interface as returned by {@link load}. */
export interface IModule {
    /** A reference to the underlying memory instance. */
    memory: WebAssembly.Memory;
    /** Imported elements. Usually functions. */
    imports: {
        [key: string]: any;
    };
    /** Exported elements. Usually functions. */
    exports: {
        [key: string]: any;
    };
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
export declare function load(file: ArrayBuffer | Uint8Array | string, options?: ILoadOptions): Promise<IModule>;
export { load as default };
