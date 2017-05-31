var compiler = require("webassembly/cli/compiler");
var assembler = require("webassembly/cli/assembler");
var disassembler = require("webassembly/cli/disassembler");
var fs = require("fs");

compiler.main([
  "-O",
  "-o", __dirname + "/malloc.wasm",
  __dirname + "/malloc.c"
], function(err, filename) {
  if (err) throw err;

  disassembler.main([
    "-o", __dirname + "/malloc.wast",
    __dirname + "/malloc.wasm"
  ], function(err, filename) {
    if (err) throw err;

    fs.readFile(__dirname + "/malloc.wast", function(err, contents) {
      if (err) throw err;

      fs.writeFile(__dirname + "/malloc.wast", contents.toString().replace(/^\s*\((?:import|table|data)\b.*$/mg, ""), "utf8", function(err) {
        if (err) throw err;

        assembler.main([
          "-o", __dirname + "/malloc.wasm",
          __dirname + "/malloc.wast"
        ], function(err, filename) {
          if (err) throw err;

          disassembler.main([
            "-o", __dirname + "/malloc.wast",
            __dirname + "/malloc.wasm"
          ], function(err, filename) {
            if (err) throw err;

            fs.readFile(__dirname + "/malloc.wast", function(err, contents) {
              if (err) throw err;

              contents = contents.toString();
              var re = /^\s*\(export "([^"]+)" \(func \$(\d+)\)\)$/mg;
              var match;
              var indexes = {};
              while (match = re.exec(contents)) {
                indexes[match[1]] = match[2];
              }

              fs.writeFile(__dirname + "/malloc.json", JSON.stringify(indexes), "utf8", function(err) {
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
