/// <reference path="./empty.d.ts" />
/// <reference path="../assembly.d.ts" />

class SomeClass {
  a: int;
  b: int;
}

function whatsthesize<T>(): uintptr {
  return sizeof<T>();
}

export function main(): uintptr {
  /* let a: Array<int> = new Array<int>(10);
  let s: String = new String(10);
  let h: SomeClass = new SomeClass();
  return a.length; */
  return whatsthesize<uintptr>();
}
