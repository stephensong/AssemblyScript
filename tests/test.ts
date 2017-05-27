/// <reference path="../assembly.d.ts" />

const a: int = 1;
let b: int = 2;

function test(): void {
  grow_memory(2);
  b = current_memory();
}
