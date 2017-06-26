import * as tape from "tape";
import load from "../lib/loader";

function hexdump(buffer: Uint8Array, offset: number, length: number): string {
  var out: string[] = [];
  for (let i = 0; i < length; ++i) {
    let b = buffer[offset + i].toString(16);
    if (b.length < 2) b = "0" + b;
    if ((i % 16) === 0) {
      let l = (offset + i).toString(16);
      while (l.length < 6) l = "0" + l;
      if (i > 0)
        out.push("\n");
      out.push("> " + l + ":");
    }
    out.push(" " + b);
  }
  return out.join("");
}

export function array(test: tape.Test) {

  load(__dirname + "/interop/array.wasm").then(module => {

    const exports = module.exports;

    // getArray(): int[] -> pointer
    let ptr = exports.getArray() >>> 0;

    // verify initial contents set within start()
    console.log(hexdump(module.buffer, ptr, 16));
    test.strictEqual(exports.getArrayElement(0), 1, "should have initialized a[0] = 1");
    test.strictEqual(exports.getArrayElement(1), 2, "should have initialized a[1] = 2");
    test.strictEqual(exports.getArrayElement(2), 3, "should have initialized a[2] = 3");

    // create a new array (this calls malloc) of size 3 with 4-byte (int) elements
    let array = module.array.create(3, 4);

    // set values to 4, 5, 6
    for (let i = 0; i < 3; ++i)
      module.s32.set(array.base + i * 4, i + 4);

    // set the entire array by reference (its pointer value)
    exports.setArray(array.ptr);

    // verify that 'a' now references the new array
    console.log(hexdump(module.buffer, array.ptr, 16));
    test.strictEqual(exports.getArray(), array.ptr, "should now reference the temporary array");
    test.strictEqual(exports.getArrayElement(0), 4, "should return a[0] = 4");
    test.strictEqual(exports.getArrayElement(1), 5, "should return a[1] = 5");
    test.strictEqual(exports.getArrayElement(2), 6, "should return a[2] = 6");

    // set new element values through a[i] = ...
    exports.setArrayElement(0, 7);
    exports.setArrayElement(1, 8);
    exports.setArrayElement(2, 9);

    // verify that the values have been changed
    console.log(hexdump(module.buffer, array.ptr, 16));
    test.strictEqual(exports.getArray(), array.ptr, "should still reference the temporary array");
    test.strictEqual(exports.getArrayElement(0), 7, "should return a[0] = 7");
    test.strictEqual(exports.getArrayElement(1), 8, "should return a[1] = 8");
    test.strictEqual(exports.getArrayElement(2), 9, "should return a[2] = 9");

    // set new element values by providing a reference to the initial array
    exports.setArrayFrom(ptr);

    // verify that the values have been changed
    console.log(hexdump(module.buffer, array.ptr, 16));
    test.strictEqual(exports.getArray(), array.ptr, "should still reference the temporary array");
    test.strictEqual(exports.getArrayElement(0), 1, "should return a[0] = 1");
    test.strictEqual(exports.getArrayElement(1), 2, "should return a[1] = 2");
    test.strictEqual(exports.getArrayElement(2), 3, "should return a[2] = 3");

    // reset to the initial reference and free the temporary array
    exports.setArray(ptr);
    exports.free(array.ptr);

    // verify that the reference has been changed
    console.log(hexdump(module.buffer, ptr, 16));
    test.strictEqual(exports.getArray(), ptr, "should now reference the initial array again");
    test.strictEqual(exports.getArrayElement(0), 1, "should return a[0] = 1");
    test.strictEqual(exports.getArrayElement(1), 2, "should return a[1] = 2");
    test.strictEqual(exports.getArrayElement(2), 3, "should return a[2] = 3");

    // verify that 'free' above worked
    const reusedPtr = exports.malloc(1);
    test.strictEqual(reusedPtr, array.ptr, "should reuse memory of the free'd temporary array");

    test.end();
  }).catch(err => {
    test.fail("should not be rejected (" + err.message + ")");
    test.end();
  });

}

export function float(test: tape.Test) {

  load(__dirname + "/interop/float.wasm").then(module => {

    const exports = module.exports;

    let floatPtr = exports.getFloatArray();
    let doublePtr = exports.getDoubleArray();

    // check float return values and memory accessor
    console.log(hexdump(module.buffer, floatPtr, 8));
    test.strictEqual(exports.getFloatValue(), 0.125, "should have initialized a = 0.125");
    test.strictEqual(module.f32.get(floatPtr + 4), 0.125, "should f32.get the same value");

    // check double return values and memory accessor
    console.log(hexdump(module.buffer, doublePtr, 12));
    test.strictEqual(exports.getDoubleValue(), 1.25, "should have initialized b = 1.25");
    test.strictEqual(module.f64.get(doublePtr + 4), 1.25, "should f64.get the same value");

    // check float setter
    exports.setFloatValue(0.25);
    console.log(hexdump(module.buffer, floatPtr, 8));
    test.strictEqual(exports.getFloatValue(), 0.25, "should have set a = 0.25");

    // check double setter
    exports.setDoubleValue(2.5);
    console.log(hexdump(module.buffer, doublePtr, 12));
    test.strictEqual(exports.getDoubleValue(), 2.5, "should have set b = 2.5");

    // check setting float in memory
    module.f32.set(floatPtr + 4, 0.5);
    console.log(hexdump(module.buffer, floatPtr, 8));
    test.strictEqual(exports.getFloatValue(), 0.5, "should have f32.set a = 0.5");

    // check setting double in memory
    module.f64.set(doublePtr + 4, 5.5);
    console.log(hexdump(module.buffer, floatPtr, 12));
    test.strictEqual(exports.getDoubleValue(), 5.5, "should have f64.set b = 5.5");

    test.end();
  }).catch(err => {
    test.fail("should not be rejected (" + err.message + ")");
    test.end();
  });

}

export function string(test: tape.Test) {

  load(__dirname + "/interop/string.wasm").then(module => {

    const exports = module.exports;

    let ptr = exports.getString();

    // check initialization in static memory
    console.log(hexdump(module.buffer, ptr, 10));
    test.strictEqual(module.string.get(ptr), "abc", "should have initialized a = 'abc'");

    // create a new string and set it by reference
    let stringPtr = module.string.create("def");
    exports.setString(stringPtr);

    // verify that 'a' now references the temporary string
    console.log(hexdump(module.buffer, stringPtr, 10));
    test.strictEqual(exports.getString(), stringPtr, "should now reference the temporary string");
    test.strictEqual(module.string.get(stringPtr), "def", "should have set a = 'def'");

    // replace a character in memory
    module.u16.set(stringPtr + 4 + 2, 103); // middle char = 'g'

    // verify that the character has been replaced
    console.log(hexdump(module.buffer, stringPtr, 10));
    test.strictEqual(exports.getString(), stringPtr, "should still reference the temporary string");
    test.strictEqual(module.string.get(stringPtr), "dgf", "should have replaced a[1] with 'g'");

    // reset to the initial string, by reference
    exports.setString(ptr);
    exports.free(stringPtr);

    // verify that 'a' now references the initial string
    console.log(hexdump(module.buffer, ptr, 10));
    test.strictEqual(exports.getString(), ptr, "should now reference the initial string again");
    test.strictEqual(module.string.get(ptr), "abc", "should return a = 'abc'");

    // verify that 'free' above worked
    const reusedPtr = exports.malloc(1);
    test.strictEqual(reusedPtr, stringPtr, "should reuse memory of the free'd temporary string");

    test.end();
  }).catch(err => {
    test.fail("should not be rejected (" + err.message + ")");
    test.end();
  });

}
