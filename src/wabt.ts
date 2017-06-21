let wabt: any;
try { // tslint:disable-next-line
  wabt = require("../lib/wabt");
} catch (e) {
  wabt = (<any>global).wabt || null;
}

export interface WasmToWastOptions {
  readDebugNames?: boolean;
  foldExprs?: boolean;
  inlineExport?: boolean;
  generateNames?: boolean;
}

export function wasmToWast(buffer: Uint8Array, options?: WasmToWastOptions): string {
  if (!wabt)
    throw Error("wabt.js is not present");

  if (!options) options = {};
  const module = wabt.readWasm(buffer, { readDebugNames: !!options.readDebugNames });
  if (options.generateNames) {
    module.generateNames();
    module.applyNames();
  }
  return module.toText({ foldExprs: !!options.foldExprs, inlineExport: !!options.inlineExport });
}

export interface WastToWasmOptions {
  filename?: string;
  canonicalizeLebs?: boolean;
  relocatable?: boolean;
  writeDebugNames?: boolean;
}

export function wastToWasm(text: string, options?: WastToWasmOptions): Uint8Array {
  if (!wabt)
    throw Error("wabt.js is not present");

  if (!options) options = {};
  const module = wabt.parseWast(options.filename || "module.wast", text);
  return module.toBinary({ canonicalize_lebs: !!options.canonicalizeLebs, relocatable: !!options.relocatable, write_debug_names: !!options.writeDebugNames }).buffer;
}
