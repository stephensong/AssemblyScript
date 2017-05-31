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

#define USE_LOCKS 0
#define NO_MALLOC_STATS 1
#define NO_MALLINFO 1
#define HAVE_MMAP 0
#define malloc_getpagesize 65536
#define MALLOC_ALIGNMENT 8
#define USAGE_ERROR_ACTION(m,p)
#define MALLOC_FAILURE_ACTION
#define ABORT
#define ENOMEM 12
#define EINVAL 22
#define MORECORE_CONTIGUOUS 1
#define MORECORE_CANNOT_TRIM 1
#define MORECORE wasmMoreCore
#define DLMALLOC_EXPORT

#define EXPORT __attribute__((visibility("default")))

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

static void *sbrk(ptrdiff_t increment) {
  // Convention here is that the initial heap pointer is stored at offset sizeof(uintptr_t) as an
  // uintptr_t value. We return its value when dlmalloc calls sbrk(0) to determine where to start.
  if (increment == 0)
    return (void *)(*(uintptr_t *)(void *)sizeof(uintptr_t));
  else {
    int pages = increment >> 16;
    return (void *)(__builtin_wasm_grow_memory(pages > 1 ? pages : 1) << 16);
  }
}

EXPORT void *memset(void *dest, int c, size_t n);
EXPORT void *memcpy(void *restrict dest, const void *restrict src, size_t n);
EXPORT void *malloc(size_t);
EXPORT void free(void *);
EXPORT void *wasmMoreCore(int);

#include "memset.c"
#include "memcpy.c"
#include "dlmalloc.c"

void *wasmMoreCore(ptrdiff_t size)
{
  uintptr_t *top = (uintptr_t *)sizeof(uintptr_t);
  if (size > 0) {
    size = size < 65536 ? 1 : ((size - 1) >> 16) + 1;
    void *ptr = (void *)(__builtin_wasm_grow_memory(size) << 16);
    if (ptr == 0)
      return (void *) MFAIL;
    *top = ((uintptr_t) ptr) + (size << 16);
    return ptr;
  } else if (size < 0) {
    return (void *) MFAIL;
  } else {
    return (void *) *top;
  }
}
