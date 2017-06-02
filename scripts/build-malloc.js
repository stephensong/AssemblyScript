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
  "--validate", "wasm",
  "-o", "build/malloc.wast"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-opt"), [
  "build/malloc.wast",
  "-O",
  "-o", "build/malloc.wasm"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-dis"), [
  "build/malloc.wasm",
  "-o", "build/malloc.wast"
], { cwd: basedir }))

.then(() => {

  fs.readFile(basedir + "/build/malloc.wast", function(err, contents) {
    if (err) throw err;

    contents = contents.toString();
    var re = /^\s*\(export "([^"]+)" \(func \$([^\)]+)\)\)$/mg;
    var match;
    var indexes = {};
    while (match = re.exec(contents)) {
      indexes[match[1]] = match[2];
    }

    fs.writeFile(basedir + "/build/malloc.json", JSON.stringify(indexes, null, 2), "utf8", function(err) {
      if (err) throw err;

      console.log("complete", indexes);
    });
  });

});
