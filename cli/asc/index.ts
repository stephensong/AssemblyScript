/// <reference path="../../lib/require-json.d.ts" />

import { Compiler } from "../../src/compiler";
import * as fs from "fs";
import * as minimist from "minimist";
import * as pkg from "../../package.json";

const argv = minimist(process.argv.slice(2), {
  alias: {
    out: [ "o", "outFile" ],
    validate: [ "v" ],
    optimize: [ "O" ],
    text: [ "t" ],
    nolib: [ "noLib" ]
  },
  string: [ "out" ],
  boolean: [ "text", "optimize", "validate", "nolib" ]
});

const files = argv._;

if (files.length !== 1) {
  process.stderr.write([
    "Version " + (<any>pkg).version,
    "Syntax: asc [options] [entryFile]",
    "",
    "Options:",
    " -o, --out, --outFile   Specifies the output file name.",
    " -v, --validate         Validates the module.",
    " -O, --optimize         Runs optimizing binaryen IR passes.",
    " -t, --text             Emits text format instead of a binary.",
    " --nolib                Excludes statically linked malloc/free.",
    ""
  ].join("\n"));
  process.exit(1);
}

const wasmModule = Compiler.compileFile(files[0], { noLib: !!argv.noLib });

if (!wasmModule)
  process.exit(1);

else {

  if (argv.validate) {
    const result = <any>wasmModule.validate();
    if (!result)
      throw Error("validation failed");
  }

  if (argv.optimize)
    wasmModule.optimize();

  if (argv.out && /\.wast$/.test(argv.out))
    argv.text = true;

  const output: any = argv.out ? fs.createWriteStream(argv.out) : process.stdout;

  if (argv.text || output.isTTY)
    output.write(wasmModule.emitText(), "utf8");
  else
    output.write(Buffer.from(wasmModule.emitBinary()));
}
