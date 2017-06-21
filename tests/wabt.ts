import * as wabt from "../src/wabt";
import * as fs from "fs";

let buffer = Uint8Array.from(fs.readFileSync(__dirname + "/fib.wasm"));

console.log("Buffer (from file): " + buffer);

let wast = wabt.wasmToWast(buffer, { readDebugNames: true });

console.log("Wast: " + wast);

buffer = wabt.wastToWasm(wast, { filename: "fib.wasm" });

console.log("Buffer (from output): " + buffer);

wast = wabt.wasmToWast(buffer, { readDebugNames: true });

console.log("Wast: " + wast);
