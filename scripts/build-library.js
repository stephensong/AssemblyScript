var fs = require("fs");

var out = [];
out.push(
  "/** AssemblyScript version. */",
  "export const version: string = " + JSON.stringify(require("../package.json").version) + ";",
  ""
);

var files = {};
[
  "assembly.d.ts", // must be first
  "std/array.ts",
  "std/string.ts"
].forEach(file => {
  files[file] = fs.readFileSync(__dirname + "/../" + file).toString().replace(/\r?\n/g, "\n");
});
out.push(
  "/** Library sources for in-browser usage. */",
  "export const files: { [key: string]: string } = " + JSON.stringify(files, null, 2) + ";",
  ""
);

var mallocBlob = fs.readFileSync(__dirname + "/../lib/malloc/build/malloc.wasm");
out.push(
  "/** Precompiled malloc.wasm as a base64-encoded string. */",
  "export const malloc: string = " + JSON.stringify(mallocBlob.toString("base64")) + ";",
  ""
);

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
