// Compiles the runtime components from C.
//
// This requires the "webassembly" dependency to be properly installed and working, which might not
// be the case in every environment because it depends on precompiled clang and binaryen binaries.

var util = require("webassembly/cli/util");
var path = require("path");
var fs = require("fs");

var basedir = path.join(__dirname, "..", "lib", "runtime");

build("runtime", "wasm32", { WASM32: 1 })
.then(() => console.log("complete."));

// build("runtime64", "wasm64", { WASM64: 1 })
// .then(() => console.log("complete."));

function build(name, target, defines) {

  // preprocess
  var args = [
    "runtime.c",
    "-E",
    "-o", "build/" + name + ".c"
  ];
  if (defines)
    Object.keys(defines).forEach(key => args.push("-D", key + "=" + defines[key]));

  return util.run(path.join(util.bindir, "clang"), args, { cwd: basedir })

  .then(() => // compile to s-expressions

  util.run(path.join(util.bindir, "clang"), [
    "build/" + name + ".c",
    "-S",
    "-Oz",
    "-mlittle-endian",
    "--target=" + target + "-unknown-unknown",
    "-nostdinc",
    "-nostdlib",
    "-o", "build/" + name + ".s"
  ], { cwd: basedir }))

  .then(() => // convert to wast

  util.run(path.join(util.bindir, "s2wasm"), [
    "build/" + name + ".s",
    "--initial-memory", "65536",
    "--validate", "wasm",
    "-o", "build/" + name + ".wast"
  ], { cwd: basedir }))

  .then(() => { // internalize functions

    var wastFile = path.join(basedir, "build", name + ".wast");
    var wast = fs.readFileSync(wastFile, "utf8");
    wast = wast.replace(/(func|call) (\$)(\w+)\b/g, "$1 $2.$3");
    fs.writeFileSync(wastFile, wast);

  })

  .then(() => // optimize and convert to wasm

  util.run(path.join(util.bindir, "wasm-opt"), [
    "build/" + name + ".wast",
    "-g",
    "-Oz",
    "--coalesce-locals-learning",
    "--ignore-implicit-traps",
    "--dce",
    "--duplicate-function-elimination",
    "--inlining",
    "--local-cse",
    "--merge-blocks",
    "--optimize-instructions",
    "--pick-load-signs",
    "--precompute",
    "--remove-unused-brs",
    "--remove-unused-module-elements",
    "--reorder-locals",
    "--simplify-locals",
    "--vacuum",
    "-o", "build/" + name + ".wasm"
  ], { cwd: basedir }))

  .then(() => // disassemble to optimized wast

  util.run(path.join(util.bindir, "wasm-dis"), [
    "build/" + name + ".wasm",
    "-o", "build/" + name + ".wast"
  ], { cwd: basedir }));

}