/// <reference path="../assembly.d.ts" />

export function testTernary(a: int, b: int): int {
  return a > b ? a == b ? 0 : 1 : -1 as ushort;
}

export function overflow(): byte {
  return (0xFF as byte) + (0xFF as byte);
}
