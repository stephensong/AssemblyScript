#pragma once

#define export __attribute__((visibility("default")))

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

#define NULL ((void*)0)

#define UINTPTR_MAX (0xffffffff)

typedef unsigned long __jmp_buf[6];
