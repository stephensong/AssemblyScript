/// <reference path="../assembly.d.ts" />

// TODO: binaryen's optimizer seems to keep / eliminate random things here

class MyClass {
  instanceFunctionVoid(): void {
  }

  static staticFunctionVoid(): void {
  }

  instanceFunctionInt(v: int): int {
    return v;
  }

  static staticFunctionInt(v: int): int {
    return v;
  }
}

export function dropPrefix(a: int): void {
  ++a;
  --a;
  +a;
  -a;
}

export function dontDropPrefix(a: int): int {
  return ++a;
}

export function dropPostfix(a: int): void {
  a++;
  a--;
}

export function dontDropPostfix(a: int): int {
  return a++;
}

export function dropBinary(a: int, b: int): void {
  a + b;
  a - b;
  a * b;
  a / b;
  a == b;
  a != b;
  a > b;
  a >= b;
  a < b;
  a <= b;
  // int only
  a % b;
  a & b;
  a | b;
  a ^ b;
  a << b;
  a >> b;
}

export function dontDropBinary(a: int, b: int): int {
  return a + b;
}

export function ifFloat(a: float, b: double): void {
  if (a) {}
  while (a) {}
  do {} while (a);
  if (b) {}
  while (b) {}
  do {} while (b);
}
