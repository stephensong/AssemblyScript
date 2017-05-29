/// <reference path="../assembly.d.ts" />

let currentHeapPtr: uintptr = 0;

// this just allocates more memory...
export function allocate_memory(size: uint): uintptr {
  if (size < 1)
    return 0;
  let currentMemory: uintptr = current_memory() << 16;
  if (currentHeapPtr >= currentMemory) {
    let pages: uint = ((currentMemory - currentHeapPtr + size) >> 16) as uint;
    grow_memory(pages != 0 ? pages : 1);
  }
  const allocationOffset: uintptr = currentHeapPtr;
  currentHeapPtr += size;
  if (currentHeapPtr & 7) // align to 8 bytes
    currentHeapPtr = (currentHeapPtr | 7) + 1;
  return allocationOffset;
}

// ...without ever freeing it
export function deallocate_memory(ptr: uintptr): void {
}
