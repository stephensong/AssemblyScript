/// <reference path="../../lib/require-json.d.ts" />

import { Compiler, CompilerTarget } from "../../src/compiler";
import * as fs from "fs";
import * as minimist from "minimist";
import * as pkg from "../../package.json";

const argv = minimist(process.argv.slice(2), {
  alias: {
    out: [ "o", "outFile" ],
    validate: [ "v" ],
    optimize: [ "O" ]
  },
  default: {
    "validate": false,
    "optimize": false,
    "text": false,
    "silent": false,
    "malloc": true,
    "export-malloc": true
  },
  string: [ "out" ],
  boolean: [ "optimize", "validate", "text", "silent", "malloc", "export-malloc" ]
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
    " --text                 Emits text format instead of a binary.",
    " --silent               Does not print anything to console.",
    /*
    " --target               Specifies the target architecture.",
    "",
    "                        WASM32   Compiles to 32-bit WebAssembly (default)",
    "                        WASM64   Compiles to 64-bit WebAssembly",
    "",
    */
    " --no-malloc            Does not include malloc, free, etc.",
    " --no-export-malloc     Does not export malloc, free, etc.",
    ""
  ].join("\n"));
  process.exit(1);
}

const wasmModule = Compiler.compileFile(files[0], {
  target: argv.target === "WASM64" ? CompilerTarget.WASM64 : CompilerTarget.WASM32,
  silent: argv.silent,
  malloc: argv.malloc,
  exportMalloc: argv["export-malloc"]
});

if (!wasmModule)
  process.exit(1);

else {

  if (argv.validate) {
    const result = <any>wasmModule.validate();
    if (!result) {
      process.stderr.write("\nValidation failed. See above for details.\n");
      process.exit(1);
    }
  }

  if (argv.optimize)
    wasmModule.optimize();

  if (argv.out && /\.wast$/.test(argv.out))
    argv.text = true;

  const output: any = argv.out ? fs.createWriteStream(argv.out) : process.stdout;

  if (argv.text || output.isTTY)
    output.write(wasmModule.emitText(), "utf8");
  else
    output.write(Buffer.from(<Buffer>wasmModule.emitBinary()));
  wasmModule.dispose();
}
