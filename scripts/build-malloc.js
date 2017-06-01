var util = require("webassembly/cli/util");
var path = require("path");
var fs = require("fs");

var basedir = path.join(__dirname, "..", "lib", "malloc");

util.run(path.join(util.bindir, "clang"), [
  "malloc.c",
  "-S",
  "-O",
  "--target=wasm32-unknown-unknown",
  "-nostdinc",
  "-nostdlib",
  "-o", "malloc.s"
], { cwd: basedir })

.then(() =>

util.run(path.join(util.bindir, "s2wasm"), [
  "malloc.s",
  "--initial-memory", "65536",
  "--validate", "wasm",
  "-o", "malloc.wast"
], { cwd: basedir }))

.then(() =>

util.run(path.join(util.bindir, "wasm-opt"), [
  "malloc.wast",
  "-O",
  "-o", "malloc.wasm"
], { cwd: basedir })

.then(() =>

util.run(path.join(util.bindir, "wasm-dis"), [
  "malloc.wasm",
  "-o", "malloc.wast"
], { cwd: basedir }))

.then(() => {
  fs.readFile(basedir + "/malloc.wast", function(err, contents) {
    if (err) throw err;

    contents = contents.toString();
    var re = /^\s*\(export "([^"]+)" \(func \$([^\)]+)\)\)$/mg;
    var match;
    var indexes = {};
    while (match = re.exec(contents)) {
      indexes[match[1]] = match[2];
    }

    fs.writeFile(basedir + "/malloc.json", JSON.stringify(indexes), "utf8", function(err) {
      if (err) throw err;

      console.log("complete", indexes);
    });
  });
})

);
