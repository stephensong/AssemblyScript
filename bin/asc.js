var fs = require("fs");
var path = require("path");
var minimist = require("minimist");
var chalk = require("chalk");
var pkg = require("../package.json");
var assemblyscript;

var isDev = fs.existsSync(__dirname + "/../src/index.ts") && path.basename(path.join(__dirname, "..", "..")) !== "node_modules";
isDev = false;

if (isDev) {
  require("ts-node/register");
  assemblyscript = require("../src");
} else
  assemblyscript = require("../dist/assemblyscript");

var Compiler = assemblyscript.Compiler;

var ESUCCESS = 0;
var EUSAGE = 1;
var EINVALID = 2;
var EFAILURE = 3;

function main(args) {

  var argv = minimist(args, {
    alias: {
      out: [ "o", "outFile", "outfile", "out-file" ],
      validate: [ "v" ],
      optimize: [ "O" ],
      target: [ "t" ],
      memorymodel: [ "mm", "memoryModel", "memory-model" ],
      help: [ "h" ]
    },
    default: {
      "validate": false,
      "optimize": false,
      "silent": false,
      "memory": "malloc"
    },
    string: [ "out", "text", "memorymodel" ],
    boolean: [ "optimize", "validate", "silent", "help" ]
  });

  var files = argv._;

  if (argv.help || files.length !== 1) {
    process.stderr.write([
      "Version " + pkg.version + (isDev ? "-dev" : ""),
      "Syntax: "+ chalk.cyan.bold("asc") + " [options] entryFile",
      "",
      "Options:",
      " --out, -o, --outFile   Specifies the output file name.",
      " --validate, -v         Validates the module.",
      " --optimize, -O         Runs optimizing binaryen IR passes.",
      " --silent               Does not print anything to console.",
      " --text                 Emits text format instead of a binary.",
      "",
      "                        sexpr   Emits s-expression syntax as produced by Binaryen. " + chalk.gray("[default]"),
      "                        stack   Emits stack syntax / official text format.",
      "",
      " --target, -t           Specifies the target architecture.",
      "",
      "                        wasm32  Compiles to 32-bit WebAssembly. " + chalk.gray("[default]"),
      "                        wasm64  Compiles to 64-bit WebAssembly.",
      "",
      " --memorymodel, -mm     Specifies the memory model to use.",
      "",
      "                        malloc        Bundles malloc, free, etc. " + chalk.gray("[default]"),
      "                        exportmalloc  Bundles malloc, free, etc. and exports each to the embedder.",
      "                        importmalloc  Imports malloc, free, etc. as provided by the embedder within 'env'.",
      "                        bare          Excludes malloc, free, etc. entirely.",
      ""
    ].join("\n"));
    return EUSAGE;
  }

  var wasmModule = Compiler.compileFile(files[0], {
    silent: !!argv.silent,
    target: argv.target,
    memoryModel: argv.memorymodel
  });

  if (!wasmModule)
    return EFAILURE;

  if (argv.validate) {
    var result = wasmModule.validate(); // FIXME: this always prints to console on error
    if (!result) {
      if (!argv.silent)
        process.stderr.write("\nValidation failed. See above for details.\n");
      return EINVALID;
    }
  }

  if (argv.optimize)
    wasmModule.optimize();

  if (argv.out && /\.wast$/.test(argv.out))
    argv.text = true;

  var output = argv.out ? fs.createWriteStream(argv.out) : process.stdout;

  if (argv.text !== undefined || output.isTTY) {
    if (argv.text === "stack") {
      if (!assemblyscript.wabt.available) {
        if (!argv.silent)
          process.stderr.write("\n" + assemblyscript.wabt.ENOTAVAILABLE + "\n");
        return EFAILURE;
      }
      output.write(assemblyscript.wabt.wasmToWast(wasmModule.emitBinary(), { readDebugNames: true }), "utf8");
    } else
      output.write(wasmModule.emitText(), "utf8");
  } else
    output.write(Buffer.from(wasmModule.emitBinary()));

  wasmModule.dispose();
  return ESUCCESS;
}

exports.main = main;
