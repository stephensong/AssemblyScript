/// <reference path="../../lib/require-json.d.ts" />

import { Compiler, CompilerTarget } from "../../src/compiler";
import { wasmToWast } from "../../src/wabt";
import * as fs from "fs";
import * as minimist from "minimist";
import * as pkg from "../../package.json";

export const ESUCCESS = 0;
export const EUSAGE = 1;
export const EINVALID = 2;
export const EFAILURE = 3;

export function main(args: string[]): number {

  const argv = minimist(args, {
    alias: {
      out: [ "o", "outFile" ],
      validate: [ "v" ],
      optimize: [ "O" ]
    },
    default: {
      "validate": false,
      "optimize": false,
      "silent": false,
      "malloc": true,
      "export-malloc": true
    },
    string: [ "out", "text"],
    boolean: [ "optimize", "validate", "silent", "malloc", "export-malloc" ]
  });

  const files = argv._;

  if (files.length !== 1) {
    process.stderr.write([
      "Version " + (<any>pkg).version,
      "Syntax: asc [options] [entryFile]",
      "",
      "Options:",
      " --out, -o              Specifies the output file name.",
      " --validate, -v         Validates the module.",
      " --optimize, -O         Runs optimizing binaryen IR passes.",
      " --silent               Does not print anything to console.",
      " --text                 Emits text format instead of a binary.",
      "",
      "                        sexpr    S-Expression syntax (default)",
      "                        stack    Stack syntax",
      "",
      " --target               Specifies the target architecture.",
      "",
      "                        WASM32   Compiles to 32-bit WebAssembly (default)",
      "                        WASM64   Compiles to 64-bit WebAssembly",
      "",
      " --no-malloc            Does not include malloc, free, etc.",
      " --no-export-malloc     Does not export malloc, free, etc.",
      ""
    ].join("\n"));
    return EUSAGE;
  }

  if (argv["text-format"])
    argv.text = true;

  const wasmModule = Compiler.compileFile(files[0], {
    target: argv.target === "WASM64" ? CompilerTarget.WASM64 : CompilerTarget.WASM32,
    silent: argv.silent,
    malloc: argv.malloc,
    exportMalloc: argv["export-malloc"]
  });

  if (!wasmModule)
    return EFAILURE;

  if (argv.validate) {
    const result = <any>wasmModule.validate();
    if (!result) {
      process.stderr.write("\nValidation failed. See above for details.\n");
      return EINVALID;
    }
  }

  if (argv.optimize)
    wasmModule.optimize();

  if (argv.out && /\.wast$/.test(argv.out))
    argv.text = true;

  const output: any = argv.out ? fs.createWriteStream(argv.out) : process.stdout;

  if (argv.text !== undefined || output.isTTY) {
    if (argv.text === "stack")
      output.write(wasmToWast(wasmModule.emitBinary(), { readDebugNames: true }), "utf8");
    else
      output.write(wasmModule.emitText(), "utf8");
  } else
    output.write(Buffer.from(<Buffer>wasmModule.emitBinary()));
  wasmModule.dispose();

  return ESUCCESS;
}
