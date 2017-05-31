var compiler = require("webassembly/cli/compiler");
var assembler = require("webassembly/cli/assembler");
var disassembler = require("webassembly/cli/disassembler");
var fs = require("fs");
var path = require("path");

var basedir = path.join(__dirname, "..", "lib", "malloc");

compiler.main([
  "-O",
  "-o", basedir + "/malloc.wasm",
  basedir + "/malloc.c"
], function(err, filename) {
  if (err) throw err;

  disassembler.main([
    "-o", basedir + "/malloc.wast",
    basedir + "/malloc.wasm"
  ], function(err, filename) {
    if (err) throw err;

    fs.readFile(basedir + "/malloc.wast", function(err, contents) {
      if (err) throw err;

      fs.writeFile(basedir + "/malloc.wast", contents.toString().replace(/^\s*\((?:import|table|data)\b.*$/mg, ""), "utf8", function(err) {
        if (err) throw err;

        assembler.main([
          "-o", basedir + "/malloc.wasm",
          basedir + "/malloc.wast"
        ], function(err, filename) {
          if (err) throw err;

          disassembler.main([
            "-o", basedir + "/malloc.wast",
            basedir + "/malloc.wasm"
          ], function(err, filename) {
            if (err) throw err;

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

                console.log("complete:", indexes);
              });
            });
          });
        });
      });
    });
  });
});
