// dlmalloc config
#define LACKS_UNISTD_H 1
#define LACKS_FCNTL_H 1
#define LACKS_SYS_PARAM_H 1
#define LACKS_SYS_MMAN_H 1
#define LACKS_STRINGS_H 1
#define LACKS_STRING_H 1
#define LACKS_SYS_TYPES_H 1
#define LACKS_ERRNO_H 1
#define LACKS_STDLIB_H 1
#define LACKS_SCHED_H 1
#define LACKS_TIME_H 1
#define NO_MALLOC_STATS 1
#define NO_MALLINFO 1
#define USE_LOCKS 0
#define HAVE_MMAP 0
#define MALLOC_ALIGNMENT 8
#define USAGE_ERROR_ACTION(m,p)
#define MALLOC_FAILURE_ACTION
#define ABORT
#define ENOMEM 12
#define EINVAL 22
#define MORECORE_CONTIGUOUS 1
#define MORECORE_CANNOT_TRIM 1
#define malloc_getpagesize 65536
#define MORECORE wasm_morecore
#define DLMALLOC_EXPORT

#define export __attribute__((visibility("default")))

// sizes
#ifdef WASM64
#define _Addr long long
#else
#define _Addr int
#endif
typedef unsigned int uint32_t;
typedef unsigned long long uint64_t;
typedef unsigned _Addr size_t;
typedef unsigned _Addr uintptr_t;
typedef _Addr ptrdiff_t;
#undef _Addr

export void *memset(void *dest, int c, size_t n);
export void *memcpy(void *restrict dest, const void *restrict src, size_t n);
export void *malloc(size_t);
export void free(void *);
static inline void *wasm_morecore(ptrdiff_t);

#include "memset.c"
#include "memcpy.c"
#include "dlmalloc.c"

void *wasm_morecore(ptrdiff_t size) {
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
