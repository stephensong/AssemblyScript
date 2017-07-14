// Compiles the runtime components from C.
//
// This requires the "webassembly" dependency to be properly installed and working, which might not
// be the case in every environment because it depends on precompiled clang and binaryen binaries.

var util = require("webassembly/cli/util");
var path = require("path");
var fs = require("fs");

var basedir = path.join(__dirname, "..", "lib", "runtime");

util.run(path.join(util.bindir, "clang"), [
  "runtime.c",
  "-E",
  "-o", "build/runtime.c"
], { cwd: basedir })

.then(() =>

util.run(path.join(util.bindir, "clang"), [
  "runtime.c",
  "-S",
  "-O",
  "-mlittle-endian",
  "--target=wasm32-unknown-unknown",
  "-nostdinc",
  "-nostdlib",
  "-o", "build/runtime.s"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "s2wasm"), [
  "build/runtime.s",
  "--initial-memory", "65536",
  "--validate", "wasm",
  "-o", "build/runtime.wast"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-opt"), [
  "build/runtime.wast",
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
  "-o", "build/runtime.wasm"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-dis"), [
  "build/runtime.wasm",
  "-o", "build/runtime.wast"
], { cwd: basedir }))

.then(() => console.log("complete"));
