//! { "memoryModel": "bare" }

export function testIntToFloat(a: int): float {
  return reinterpretf(a);
}

export function testLongToDouble(a: long): double {
  return reinterpretd(a);
}

export function testFloatToInt(a: float): int {
  return reinterpreti(a);
}

export function testDoubleToLong(a: double): long {
  return reinterpretl(a);
}
