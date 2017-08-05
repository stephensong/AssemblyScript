#include "runtime.h"

#include "deps/memcmp.c"
#include "deps/memcpy.c"
#include "deps/memset.c"
#include "deps/dlmalloc.c"
#include "deps/morecore.c"
#if INCLUDE_GC
#include "deps/tgc.c"
#endif

void init() {
  _MSPACE = (uintptr_t)create_mspace_with_base((void *)_HEAP, (__builtin_wasm_current_memory() << 16) - _HEAP, 0);
#if INCLUDE_GC
  _GC = (uintptr_t)__malloc(sizeof(tgc_t));
  tgc_start((tgc_t *)_GC, (void *)_HEAP);
#endif
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

#if INCLUDE_GC

void gc_pause() {
  tgc_pause((tgc_t *)_GC);
}

void gc_resume() {
  tgc_resume((tgc_t *)_GC);
}

void gc_collect() {
  tgc_run((tgc_t *)_GC);
}

void *gc_alloc(size_t size, int flags) {
  return tgc_alloc_opt((tgc_t *)_GC, size, flags, NULL);
}

// void *gc_calloc(size_t count, size_t size, int flags) {
//   return tgc_calloc_opt((tgc_t *)_GC, count, size, flags, NULL);
// }

void *gc_realloc(void *ptr, size_t size) {
  return tgc_realloc((tgc_t *)_GC, ptr, size);
}

void *gc_retain(void *ptr) {
  tgc_set_flags((tgc_t *)_GC, ptr, tgc_get_flags((tgc_t *)_GC, ptr) | TGC_ROOT);
  return ptr;
}

void *gc_release(void *ptr) {
  tgc_set_flags((tgc_t *)_GC, ptr, tgc_get_flags((tgc_t *)_GC, ptr) & ~TGC_ROOT);
  return ptr;
}

#endif
