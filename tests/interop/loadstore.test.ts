import * as tape from "tape";
import { hexdump, IModule, Long, arrayHeaderSize } from "../util";

export function test(test: tape.Test, module: IModule) {

  const exports = module.exports;

  const ptr = 8;

  console.log(hexdump(module.buffer, ptr, 4));

  test.strictEqual(module.int.get(ptr), 0, "should have initialized mem[4-7]<int> = 0");
  test.strictEqual(exports.doload(ptr), 0, "should load mem[4-7]<int> = 0")

  exports.dostore(ptr, 123);

  console.log(hexdump(module.buffer, ptr, 4));

  test.strictEqual(module.int.get(ptr), 123, "should have set mem[4-7]<int> = 123");
  test.strictEqual(exports.doload(ptr), 123, "should load mem[4-7]<int> = 123");

  test.end();
}
