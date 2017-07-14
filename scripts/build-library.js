// Packages necessary library files for in-browser usage.

var fs = require("fs");

var out = [
  "/**",
  " * Bundled library components for in-browser usage.",
  " * @module assemblyscript/library",
  " */",
  ""
];
out.push(
  "/** AssemblyScript version. */",
  "export const version: string = " + JSON.stringify(require("../package.json").version) + ";",
  ""
);

var files = {};
[
  "assembly.d.ts", // must be first
  "std/disposable.ts",
  "std/array.ts",
  "std/string.ts",
  "std/console.ts",
].forEach(file => {
  files[file] = fs.readFileSync(__dirname + "/../" + file).toString().replace(/\r?\n/g, "\n");
});
out.push(
  "/** Library sources for in-browser usage. */",
  "export const files: { [key: string]: string } = " + JSON.stringify(files, null, 2) + ";",
  ""
);

var runtimeBlob = fs.readFileSync(__dirname + "/../lib/runtime/build/runtime.wasm");
out.push(
  "/** Precompiled memory management runtime as a base64-encoded string. */",
  "export const runtime: string = " + JSON.stringify(runtimeBlob.toString("base64")) + ";",
  ""
);

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
