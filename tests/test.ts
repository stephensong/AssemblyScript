/// <reference path="../assembly.d.ts" />

const a: int = 1;
let b: int = 2;

export function test(): void {
  grow_memory(a);
  b = current_memory();
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

export function testEmpty(): void {
  while (true);
}
