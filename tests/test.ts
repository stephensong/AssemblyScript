/// <reference path="../assembly.d.ts" />

const a: int = 1;
let b: int = 2;

export function test(): void {
  grow_memory(a);
  b = current_memory();
}
