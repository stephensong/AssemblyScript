import * as tape from "tape";
import { hexdump, IModule, arrayHeaderSize } from "../util";

export function test(test: tape.Test, module: IModule) {

  const exports = module.exports;

  let ptr = exports.getArray();

  console.log(hexdump(module.buffer, ptr, 4 * arrayHeaderSize + 6 * 4)); // 4 (nested) arrays, 6 int elements in total

  let array = module.array.get(ptr);

  test.strictEqual(array.capacity, 3, "should have initialized an array of capacity 3");
  test.strictEqual(array.length, 3, "should have initialized an array of length 3");

  let array1 = module.array.get(module.uint.get(array.base));

  test.strictEqual(array1.capacity, 4, "should have initialized inner array 1 of capacity 4");
  test.strictEqual(array1.length, 4, "should have initialized inner array 1 of length 4");
  [1, 2, 0, 3].forEach((value, index) => {
    test.strictEqual(module.int.get(array1.base + index * 4), value, "should have initialized array1[" + index + "] = " + value);
  });

  let array2 = module.array.get(module.uint.get(array.base + 4));
  test.strictEqual(array2.capacity, 2, "should have initialized inner array 2 of capacity 2");
  test.strictEqual(array2.length, 2, "should have initialized inner array 2 of length 2");
  [4, 5].forEach((value, index) => {
    test.strictEqual(module.int.get(array2.base + index * 4), value, "should have initialized array2[" + index + "] = " + value);
  });

  let array3 = module.array.get(module.uint.get(array.base + 8));
  test.strictEqual(array3.capacity, 0, "should have initialized inner array 3 of capacity 0");
  test.strictEqual(array3.length, 0, "should have initialized inner array 3 of length 0");

  test.end();
}