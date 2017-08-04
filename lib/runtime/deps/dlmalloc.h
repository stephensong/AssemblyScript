#pragma once

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
#define HAVE_MORECORE 1
#define USAGE_ERROR_ACTION(m,p)
#define MALLOC_FAILURE_ACTION
#define ABORT __builtin_unreachable()
#define ENOMEM 12
#define EINVAL 22
#define DLMALLOC_EXPORT
#define ONLY_MSPACES 1
#define MALLOC_ALIGNMENT 8
#define MORECORE_CONTIGUOUS 1
#define MORECORE_CANNOT_TRIM 1
#define MORECORE morecore
#define malloc_getpagesize 65536
#define DEFAULT_GRANULARITY 65536

static inline void *morecore(ptrdiff_t);
