#pragma once

#include "arch.h"

export void *memset(void *dest, int c, size_t n);
export void *memcpy(void *restrict dest, const void *restrict src, size_t n);
export void *malloc(size_t);
export void  free(void *);
