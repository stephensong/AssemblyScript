#pragma once

#include "arch.h"

#define _HEAP   (*((uintptr_t *) 8))
#define _MSPACE (*((uintptr_t *)16))
#define _GC     (*((uintptr_t *)24))

export int   memcmp(const void *, const void *, size_t);
export void *memcpy(void *, const void *, size_t);
export void *memset(void *, int, size_t);

export void  init();
export void *malloc(size_t);
export void *calloc(size_t, size_t);
export void *realloc(void *, size_t);
export void  free(void *);
