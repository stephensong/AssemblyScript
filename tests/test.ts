/// <reference path="../assembly.d.ts" />

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

function dropPrefix(a: int): void {
  ++a;
  --a;
  +a;
  -a;
}

function dontDropPrefix(a: int): int {
  return ++a;
}

function dropPostfix(a: int): void {
  a++;
  a--;
}

function dontDropPostfix(a: int): int {
  return a++;
}

function dropBinary(a: int, b: int): void {
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

function dontDropBinary(a: int, b: int): int {
  return a + b;
}
