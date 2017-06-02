void *sbrk(ptrdiff_t size) {
  uintptr_t heapMax = (uintptr_t)__builtin_wasm_current_memory() << 16;

  if (size > 0) {

    if (__builtin_wasm_grow_memory(((size - 1) >> 16) + 1) == 0)
      return (void *) MFAIL;

  } else if (size < 0)
    return (void *) MFAIL;

  return (void *) heapMax;
}
