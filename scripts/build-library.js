var fs = require("fs");

var out = [];

var librarySource = fs.readFileSync(__dirname + "/../assembly.d.ts");
out.push(
  "/** Source of assembly.d.ts for in-browser usage. */",
  "export const libSource = `" + librarySource.toString("utf8").replace(/`/g, "\\`") + "`;",
  ""
);

var mallocBlob = fs.readFileSync(__dirname + "/../lib/malloc/build/malloc.wasm");
out.push(
  "/** Precompiled malloc.wasm as a base64-encoded string. */",
  "export const mallocBlob = \"" + mallocBlob.toString("base64") + "\";",
  ""
);

fs.writeFileSync(__dirname + "/../src/library.ts", out.join("\n"), "utf8");
