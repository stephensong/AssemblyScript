"use strict";
var binaryen = require("./src/binaryen");
var builtins = require("./src/builtins");
var compiler_1 = require("./src/compiler");
var expressions = require("./src/expressions");
var library = require("./src/library");
var profiler_1 = require("./src/profiler");
var reflection = require("./src/reflection");
var typescript = require("./src/typescript");
var statements = require("./src/statements");
var assemblyscript = {
    binaryen: binaryen,
    builtins: builtins,
    Compiler: compiler_1["default"],
    expressions: expressions,
    library: library,
    Profiler: profiler_1["default"],
    reflection: reflection,
    statements: statements,
    typescript: typescript
};
if (typeof global !== "undefined" && global)
    global.assemblyscript = assemblyscript;
if (typeof window !== "undefined" && window)
    window.assemblyscript = assemblyscript;
module.exports = assemblyscript;
