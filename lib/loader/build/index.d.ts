/// <reference path="../types/webassembly.d.ts" />
export interface ILoadOptions {
    initialMemory?: number;
    maximumMemory?: number;
    imports?: {
        [key: string]: any;
    };
}
export interface IModule {
    memory: WebAssembly.Memory;
    imports: {
        [key: string]: any;
    };
    exports: {
        [key: string]: any;
    };
    U8: Uint8Array;
    S8: Int8Array;
    U16: Uint16Array;
    S16: Int16Array;
    U32: Uint32Array;
    S32: Int32Array;
    F32: Float32Array;
    F64: Float64Array;
    currentMemory(): number;
    growMemory(numPages: number): number;
}
export declare function load(file: ArrayBuffer | Uint8Array | string, options?: ILoadOptions): Promise<IModule>;
export { load as default };
