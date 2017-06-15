var fs = require("fs");

var out = [];
out.push(
  "/** AssemblyScript version. */",
  "export const version: string = " + JSON.stringify(require("../package.json").version) + ";",
  ""
);

var files = {};
[
  "assembly.d.ts",
  "std/array.ts",
  "std/string.ts"
].forEach(file => {
  files[file] = fs.readFileSync(__dirname + "/../" + file).toString().replace(/\r?\n/g, "\n");
});
out.push(
  "/** Library sources for in-browser usage. */",
  "export const files: { [key: string]: string } = " + JSON.stringify(files) + ";",
  ""
);

var mallocBlob = fs.readFileSync(__dirname + "/../lib/malloc/build/malloc.wasm");
out.push(
  "/** Precompiled malloc.wasm as a base64-encoded string. */",
  "export const malloc: string = \"" + mallocBlob.toString("base64") + "\";",
  ""
);

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
