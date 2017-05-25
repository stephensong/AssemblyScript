/// <reference path="../assembly.d.ts" />

import { Hello } from "./import";

export function add(a: int, b: double): int {
  a++;
  return a++;
  /* a--;
  ++a;
  --a;
  return (a + (b as uint)) as short; */
}

function start(): void {
  // wasm start function
}