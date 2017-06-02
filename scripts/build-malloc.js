var util = require("webassembly/cli/util");
var path = require("path");
var fs = require("fs");

var basedir = path.join(__dirname, "..", "lib", "malloc");

util.run(path.join(util.bindir, "clang"), [
  "malloc.c",
  "-E",
  "-o", "build/malloc.pre.c"
], { cwd: basedir })

.then(() =>

util.run(path.join(util.bindir, "clang"), [
  "malloc.c",
  "-S",
  "-O",
  "-mlittle-endian",
  "--target=wasm32-unknown-unknown",
  "-nostdinc",
  "-nostdlib",
  "-o", "build/malloc.s"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "s2wasm"), [
  "build/malloc.s",
  "--initial-memory", "65536",
  "--global-base", "64",
  "--validate", "wasm",
  "-o", "build/malloc.wast"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-opt"), [
  "build/malloc.wast",
  "-O",
  "-g",
  "--inlining",
  "-o", "build/malloc.wasm"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-dis"), [
  "build/malloc.wasm",
  "-o", "build/malloc.wast"
], { cwd: basedir }))

.then(() => console.log("complete"));
