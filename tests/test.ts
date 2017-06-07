/// <reference path="./empty.d.ts" />
/// <reference path="../assembly.d.ts" />

class SomeClass {
  a: int;
  b: int;

  constructor(a: int, b: int) {
    // this.a = a;
    // this.b = b;
  }
}

export function main(): uintptr {
  let a: Array<int> = new Array<int>(10);
  let h: SomeClass = new SomeClass(1, 2);
  return a.length;
}
