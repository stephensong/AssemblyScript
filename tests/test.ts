/// <reference path="../assembly.d.ts" />

// import { Hello } from "./import";

class SomeClass {
  a: int;
  b: int;
}

export function main(): void {
  let a: Array<int> = new Array<int>(10);
  let s: String = new String(10);
  let h: SomeClass = new SomeClass();
  // return a.length;
}

export function test(a: int, b: float): int {
  return a %= b as int;
}
