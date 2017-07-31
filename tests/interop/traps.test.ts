import * as tape from "tape";
import { hexdump, IModule, arrayHeaderSize } from "../util";

export function test(test: tape.Test, module: IModule) {

  // This test is here to document that some operations raise a RuntimeError by design. Eventually,
  // we'll have to decide how to handle some of these, especially floating point truncation.
  // see: https://github.com/WebAssembly/design/blob/master/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions

  const exports = module.exports;

  // "Wrapping and extension of integer values always succeed."

  // "Promotion and demotion of floating point values always succeed."

  // "Demotion of floating point values uses round-to-nearest ties-to-even rounding, and may
  // overflow to infinity or negative infinity as specified by IEEE 754-2008."

  // "Reinterpretations always succeed."

  // "Conversions from integer to floating point always succeed, and use round-to-nearest
  // ties-to-even rounding."

  // "Truncation from floating point to integer where IEEE 754-2008 would specify an invalid
  // operator exception (e.g. when the floating point value is NaN or outside the range which
  // rounds to an integer in range) traps."

  try {
    exports.i32_trunc_s_f32();
    test.fail("i32.trunc_s/f32 should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "i32.trunc_s/f32 should trap with a RuntimeError (" + e.message + ")");
  }

  try {
    exports.i32_trunc_u_f32();
    test.fail("i32.trunc_u/f32 should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "i32.trunc_u/f32 should trap with a RuntimeError (" + e.message + ")");
  }

  // "unreachable: An instruction which always traps."

  try {
    exports.stmt_unreachable();
    test.fail("unreachable statements should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "unreachable statements should trap with a RuntimeError (" + e.message + ")");
  }

  // "Signed and unsigned operators trap whenever the result cannot be represented in the result
  // type. This includes division and remainder by zero, ..."

  try {
    exports.div_by_zero();
    test.fail("division by zero should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "division by zero should trap with a RuntimeError (" + e.message + ")");
  }

  try {
    exports.rem_by_zero();
    test.fail("remainder by zero should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "remainder by zero should trap with a RuntimeError (" + e.message + ")");
  }

  // "... and signed division overflow (INT32_MIN / -1)."

  try {
    exports.div_overflow();
    test.fail("signed division overflow should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "signed division overflow should trap with a RuntimeError (" + e.message + ")");
  }

  // "Out of bounds accesses trap."

  try {
    exports.oob_access();
    test.fail("out of bounds access should trap");
  } catch (e) {
    test.strictEqual(e.name, "RuntimeError", "out of bounds access should trap with a RuntimeError (" + e.message + ")");
  }

  test.end();
}