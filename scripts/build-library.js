var fs = require("fs");

var librarySource = fs.readFileSync(__dirname + "/../assembly.d.ts");
fs.writeFileSync(__dirname + "/../src/library.ts", "export const librarySource = `" + librarySource + "`;\n");
