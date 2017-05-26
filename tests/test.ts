/// <reference path="../assembly.d.ts" />

export function testTernary(a: int, b: int): int {
  return a > b ? a == b ? 0 : 1 : -1 as ushort;
}

export function overflow(): byte {
  return (0xFF as byte) + (0xFF as byte);
}

export function castIntToFloat(a: int): float {
  return reinterpretf(a);
}

export function castLongToDouble(a: long): double {
  return reinterpretd(a);
}

export function castFloatToInt(a: float): int {
  return reinterpreti(a);
}

export function castDoubleToLong(a: double): long {
  return reinterpretl(a);
}
