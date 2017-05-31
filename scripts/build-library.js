var fs = require("fs");

var out = [];

var librarySource = fs.readFileSync(__dirname + "/../assembly.d.ts");
out.push("export const libSource = `" + librarySource.toString("utf8") + "`;\n");

var mallocSource = fs.readFileSync(__dirname + "/../lib/malloc/malloc.wasm");
out.push("export const mallocSource = `" + mallocSource.toString("base64") + "`;\n");

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
