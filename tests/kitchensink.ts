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
  while (a) {};
  do {} while (a);
  if (b) {}
  while (b) {}
  do {} while (b);
}

export function ternary(a: int, b: int): int {
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


type f64 = double;

export function typeAlias(a: f64): float {
  type f32 = float;
  let b: f32 = a as float;
  return b;
}

export function testDo(n: int): int {
  let i: int = 0;
  do {
    i = i + 1;
  } while (i < n);
  return i;
}

export function testWhile(n: int): int {
  let i: int = 0;
  while (i < n) {
    i = i + 1;
  }
  return i;
}

export function empty(): void {
  while (true);
}

export function host(a: int): int {
  let b: int = grow_memory(a);
  return current_memory();
}

export function testSwitch(a: int): int {
  switch (a) {
    case 3:
      return 3;
    case 1:
      return 1;
    default:
      switch (a) {
        case 0:
          break;
        /* default:
          return 42; */
        case 4:
          return 4;
        case 5:
        case 6:
          return 56;
      }
      return 0;
    case 2:
      return 2;
  }
}

export function testSwitch2(a: int): int {
  switch (a) {
    case 1:
      return 1;
    default:
    case 2:
      a = 2;
  }
  return a;
}
