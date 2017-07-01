var fs = require("fs");
var path = require("path");
var minimist = require("minimist");
var chalk = require("chalk");
var pkg = require("../package.json");
var assemblyscript;

var isDev = fs.existsSync(__dirname + "/../src/index.ts") && path.basename(path.join(__dirname, "..", "..")) !== "node_modules";

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

/** Runs the command line compiler using the specified command line arguments. */
function main(args, callback) {

  var argv = minimist(args, {
    alias: {
      out: [ "o", "outFile", "outfile", "out-file" ],
      validate: [ "v" ],
      optimize: [ "O" ],
      target: [ "t" ],
      memorymodel: [ "m", "memory-model" ],
      textout: [ "text-out" ],
      help: [ "h" ]
    },
    default: {
      "validate": false,
      "optimize": false,
      "silent": false,
      "memory": "malloc"
    },
    string: [ "out", "text", "memorymodel", "textout"],
    boolean: [ "optimize", "validate", "silent", "help" ]
  });

  var files = argv._;

  if (argv.help || files.length !== 1) {
    process.stderr.write([
      "Version " + pkg.version + (isDev ? "-dev" : ""),
      "Syntax: "+ chalk.reset.cyan.bold("asc") + " [options] entryFile",
      "",
      chalk.reset.white.bold("Options:"),
      " --out, -o, --outFile   Specifies the output file name.",
      " --validate, -v         Validates the module.",
      " --optimize, -O         Runs optimizing binaryen IR passes.",
      " --silent               Does not print anything to console.",
      "",
      " --target, -t           Specifies the target architecture.",
      "",
      "                        wasm32  Compiles to 32-bit WebAssembly. " + chalk.gray("[default]"),
      "                        wasm64  Compiles to 64-bit WebAssembly.",
      "",
      " --memory-model, -m     Specifies the memory model to use.",
      "",
      "                        malloc        Bundles malloc, free, etc. " + chalk.gray("[default]"),
      "                        exportmalloc  Bundles malloc, free, etc. and exports each to the embedder.",
      "                        importmalloc  Imports malloc, free, etc. as provided by the embedder within 'env'.",
      "                        bare          Excludes malloc, free, etc. entirely.",
      "",
      " --text                 Emits text format instead of a binary.",
      "",
      "                        sexpr   Emits s-expression syntax as produced by Binaryen. " + chalk.gray("[default]"),
      "                        stack   Emits stack syntax / official text format.",
      "",
      " --text-out             Outputs text format alongside a binary using the given file name.",
      ""
    ].join("\n"));
    return callback(EUSAGE);
  }

  var wasmModule = Compiler.compileFile(files[0], {
    silent: !!argv.silent,
    target: argv.target,
    memoryModel: argv.memorymodel
  });

  if (!wasmModule)
    return callback(EFAILURE);

  // from this point on the module must be disposed (finish does this implicitly)

  if (argv.optimize)
    wasmModule.optimize();

  if (argv.validate) {
    var result = wasmModule.validate(); // FIXME: this always prints to console on error
    if (!result) {
      if (!argv.silent)
        process.stderr.write("\nValidation failed. See above for details.\n");
      return finish(Error("validation failed"));
    }
  }

  if (argv.out && /\.was?t$/.test(argv.out) && !argv.text)
    argv.text = "sexpr";

  // Output to file
  if (argv.out) {
    if (argv.text !== undefined) // text to file only
      writeText(wasmModule, argv.text, fs.createWriteStream(argv.out), finish);
    else if (!argv.textout) // binary to file only
      writeBinary(wasmModule, fs.createWriteStream(argv.out), finish);
    else // text to file alongside binary to file
      writeBinary(wasmModule, fs.createWriteStream(argv.out), function(err) {
        if (err) return finish(err);
        writeText(wasmModule, argv.text, fs.createWriteStream(argv.textout), finish);
      });

  // Output to stdout
  } else {
    if (argv.text !== undefined || (process.stdout.isTTY && !argv.textout)) // text to stdout only
      writeText(wasmModule, argv.text, process.stdout, finish);
    else if (!argv.textout) // binary to stdout only
      writeBinary(wasmModule, process.stdout, finish);
    else // text to file alongside binary to stdout
      writeBinary(wasmModule, process.stdout, function(err) {
        if (err) return finish(err);
        writeText(wasmModule, argv.text, fs.createWriteStream(argv.textout), finish);
      });
  }

  function finish(err) {
    wasmModule.dispose();
    if (err) return callback(err ? EFAILURE : ESUCCESS);
    callback(ESUCCESS);
  }
}

exports.main = main;

/** Writes text format of the specified module, using the specified format. */
function writeText(wasmModule, format, output, callback) {
  if (format === "stack") {
    if (!assemblyscript.wabt.available) {
      if (!argv.silent)
        process.stderr.write("\n" + assemblyscript.wabt.ENOTAVAILABLE + "\n");
      return callback(EFAILURE);
    }
    var binary = wasmModule.ascCurrentBinary || (wasmModule.ascCurrentBinary = wasmModule.emitBinary()); // reuse
    output.write(assemblyscript.wabt.wasmToWast(binary, { readDebugNames: true }), "utf8", end);
  } else
    output.write(wasmModule.emitText(), "utf8", end);

  function end(err) {
    if (err || output === process.stdout) return callback(err);
    output.end(callback);
  }
}

exports.writeText = writeText;

/** Writes a binary of the specified module. */
function writeBinary(wasmModule, output, callback) {
  output.write(Buffer.from(wasmModule.emitBinary()), end);

  function end(err) {
    if (err || output === process.stdout) return callback(err);
    output.end(callback);
  }
}

exports.writeBinary = writeBinary;
