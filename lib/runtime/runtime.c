#include "runtime.h"

#include "deps/memcmp.c"
#include "deps/memcpy.c"
#include "deps/memset.c"
#include "deps/dlmalloc.c"

// called by dlmalloc when requesting more memory
void *morecore(ptrdiff_t size) {
  uintptr_t heapMax = (uintptr_t)__builtin_wasm_current_memory() << 16;

  if (size > 0) {

    if (__builtin_wasm_grow_memory(((size - 1) >> 16) + 1) == 0)
      return (void *) MFAIL;

  } else if (size < 0)
    return (void *) MFAIL;

  return (void *) heapMax;
}

// #include "deps/setjmp.c"
// #include "deps/tgc.c"

void init() {
  _MSPACE = (uintptr_t)create_mspace_with_base((void *)_HEAP, (__builtin_wasm_current_memory() << 16) - _HEAP, 0);
  _GC = 0; // not yet implemented
}

void *malloc(size_t size) {
  return mspace_malloc((void *)_MSPACE, size);
}

void *calloc(size_t n, size_t size) {
  return mspace_calloc((void *)_MSPACE, n, size);
}

void *realloc(void *ptr, size_t size) {
  return mspace_realloc((void *)_MSPACE, ptr, size);
}

void free(void *ptr) {
  return mspace_free((void *)_MSPACE, ptr);
}
