#pragma once

#define export __attribute__((visibility("default")))

#ifdef WASM64
#define _Addr long
#define UINTPTR_MAX (0xffffffffffffffff)
#else
#define _Addr int
#define UINTPTR_MAX (0xffffffff)
#endif

typedef unsigned int uint32_t;
typedef unsigned long long uint64_t;
typedef unsigned _Addr size_t;
typedef unsigned _Addr uintptr_t;
typedef _Addr ptrdiff_t;

#undef _Addr

#define NULL ((void*)0)
