#include "runtime.h"

#include "deps/memcmp.c"
#include "deps/memcpy.c"
#include "deps/memset.c"

#include "config.h"
#include "deps/dlmalloc.c"

// initializes the single mspace used by the internal malloc implementation, starting at 'base'
void *mspace_init(void *base) {
  return create_mspace_with_base(base, (void *)((uintptr_t)__builtin_wasm_current_memory() << 16) - base, 0);
}

// called by dlmalloc when requesting more memory
void *mspace_more(ptrdiff_t size) {
  uintptr_t heapMax = (uintptr_t)__builtin_wasm_current_memory() << 16;

  if (size > 0) {

    if (__builtin_wasm_grow_memory(((size - 1) >> 16) + 1) == 0)
      return (void *) MFAIL;

  } else if (size < 0)
    return (void *) MFAIL;

  return (void *) heapMax;
}
