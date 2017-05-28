/// <reference path="../assembly.d.ts" />

let heapPtr: uintptr = 0;

function allocate(size: uintptr): uintptr {
  let ptr: uintptr = heapPtr;
  heapPtr += size;
  return ptr;
}

function dispose(ptr: uintptr): void {
}
