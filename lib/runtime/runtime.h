#pragma once

#include "arch.h"

#define INCLUDE_GC 0

#define _HEAP   (*((uintptr_t *) 8))
#define _MSPACE (*((uintptr_t *)16))
#define _GC     (*((uintptr_t *)24))

export void  init();

export int   memcmp(const void *, const void *, size_t);
export void *memcpy(void *, const void *, size_t);
export void *memset(void *, int, size_t);

export void *malloc(size_t);
       void *calloc(size_t, size_t);
export void *realloc(void *, size_t);
export void  free(void *);

#if INCLUDE_GC

export void  gc_pause();
export void  gc_resume();
export void  gc_collect();

export void *gc_alloc(size_t, int);
       void *gc_calloc(size_t, size_t, int);
export void *gc_realloc(void *, size_t);
export void  gc_retain(void *);
export void  gc_release(void *);

#endif
