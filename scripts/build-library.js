var fs = require("fs");

var out = [];

var librarySource = fs.readFileSync(__dirname + "/../assembly.d.ts");
out.push("export const libSource = `" + librarySource.toString("utf8") + "`;\n");

var mallocBlob = fs.readFileSync(__dirname + "/../lib/malloc/malloc.wasm");
out.push("export const mallocBlob = `" + mallocBlob.toString("base64") + "`;\n");

var mallocIndexes = require(__dirname + "/../lib/malloc/malloc.json");
Object.keys(mallocIndexes).map(key => {
  out.push("export const " + key + "InternalName = " + JSON.stringify(mallocIndexes[key].toString()) + ";\n");
});

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
