import * as fs from "fs";
import * as path from "path";
import * as tape from "tape";
import * as jsdiff from "diff";
import * as chalk from "chalk";
import * as minimist from "minimist";

const argv = minimist(process.argv.slice(2), {
  default: {
    "create": false
  },
  boolean: [ "create" ]
});

/** Strips everything before the first export. */
function distill(text: string): string {
  const match = /^ *\(export/m.exec(text);
  if (match)
    return text.substring(match.index).replace(/\r?\n\)\r?\n?$/, "\n");
  return text;
}

function runTests(kind, Compiler, binaryen, typescript, wabt) {

  tape(kind + " - fixtures", test => {
    const basedir = path.join(__dirname, "fixtures");
    const options = { "silent": true };

    fs.readdirSync(basedir).forEach(file => {
      if (!/\.ts$/.test(file)) return;

      test.test(kind + " - fixtures - " + file, function(test) {
        file = path.join(basedir, file);

        const source = fs.readFileSync(file, "utf8");
        const firstLine = source.split(/\r?\n/, 1)[0];
        let opts = Object.create(options);

        if (firstLine.substring(0, 3) === "//!") {
          const config = JSON.parse(firstLine.substring(3));
          Object.keys(config).forEach(key => opts[key] = config[key]);
        }

        let module: binaryen.Module;
        let actual: string = "";

        test.doesNotThrow(() => {
          module = Compiler.compileFile(file, opts);
        }, "should compile without throwing");

        const messages = typescript.formatDiagnosticsWithColorAndContext(Compiler.lastDiagnostics);
        if (messages.length)
          process.stderr.write(messages.replace(/^/mg, " ") + "\n");

        test.ok(module, "should not fail to compule");
        if (module) {
          test.ok(module.validate(), "should validate");

          actual = distill(module.emitText());

          const wastFile = file.replace(/\.ts$/, ".wast");

          if (fs.existsSync(wastFile)) {
            const expected = distill(fs.readFileSync(wastFile, "utf8"));
            const diff = jsdiff.diffChars(expected, actual);
            let changed = false;
            diff.forEach(part => {
              if (part.added || part.removed)
                changed = true;
            });
            test.notOk(changed, "should match the precompiled fixture");
            if (changed) // print a diff
              diff.forEach(part => {
                if (part.added || part.removed)
                  changed = true;
                var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                process.stderr.write(chalk[color](part.value));
              });
          } else {
            if (argv["create"]) {
              test.comment("creating fixture: " + wastFile);
              fs.writeFileSync(wastFile, actual, "utf8");
            } else
              test.fail("fixture should exist (use --create to create it)");
          }
        }
        test.end();
      });
    });

    test.end();
  });

  tape(kind + " - compileString", test => {
    const module = Compiler.compileString(`
    export function test(a: int): int {
      return a;
    }

    function start(): void {}
    `, { silent: true });

    test.ok(module, "should compile without errors");
    if (module) {
      test.notOk(Compiler.lastDiagnostics.length, "should not generate any warnings");
      test.doesNotThrow(() => {
        module.optimize();
        const text = module.emitText();
        test.ok(typeof text === "string" && text.length, "should emit a non-empty string");
      }, "should optimize and emit without throwing");
    }

    test.end();
  });


  tape(kind + " - wabt", test => {
    const source = [
      "(module",
      "  (type (;0;) (func (param i32 i32) (result i32)))",
      "  (func $add (type 0) (param i32 i32) (result i32)",
      "    get_local 0",
      "    get_local 1",
      "    i32.add)",
      "  (memory (;0;) 1)",
      "  (export \"add\" (func $add)))",
      ""
    ].join("\n");
    test.doesNotThrow(() => {
      const wasm = wabt.wastToWasm(source, { filename: "test.wasm", writeDebugNames: true });
      const wast = wabt.wasmToWast(wasm, { readDebugNames: true });
      test.equal(wast, source, "should convert from wast to wasm and back");
    }, "should convert between wast and wasm without throwing");

    test.end();
  });
}

import Compiler from "../src/compiler";
import * as binaryen from "../src/binaryen";
import * as typescript from "../src/typescript";
import * as wabt from "../src/wabt";

// test sources
runTests("src", Compiler, binaryen, typescript, wabt);

import * as dist from "..";

// test distribution
runTests("dist", dist.Compiler, dist.binaryen, dist.typescript, dist.wabt);
