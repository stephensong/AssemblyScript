void *sbrk(ptrdiff_t size) {
  // this sbrk implementation is conflict-free in that it always allocates new pages for dlmalloc's
  // use. in the future, i.e. once we know how memory is structured, this can be optimized to reuse
  // remaining initial memory.

  uintptr_t heapMax = __builtin_wasm_current_memory() << 16;
  if (size > 0) {
    if (size < 65536 || (size & 65535) != 0) // expects a multiple of page size
      return (void *) MFAIL;
    if (__builtin_wasm_grow_memory(((size - 1) >> 16) + 1) == 0)
        return (void *) MFAIL;
  } else if (size < 0) {
    return (void *) MFAIL;
  }
  return (void *) heapMax;
}
