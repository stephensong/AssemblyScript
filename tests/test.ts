/// <reference path="../assembly.d.ts" />

/* let heapPtr: uintptr = 0;

function allocate(size: uintptr): uintptr {
  let ptr: uintptr = heapPtr;
  let b: uintptr;
  b = (heapPtr += size);
  return ptr;
}

function dispose(ptr: uintptr): void {
} */

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
        default:
          return 42;
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