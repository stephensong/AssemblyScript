[AssemblyScript](https://github.com/dcodeIO/AssemblyScript)'s memory management runtime in C based on [musl](http://www.musl-libc.org/), [dlmalloc](http://g.oswego.edu/dl/html/malloc.html) and [tgc](https://github.com/orangeduck/tgc).

Memory layout
-------------

```
                                       1               2
       0               8               6               4
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      ^ NULL          | _HEAP (1)      | _MSPACE (2)    | _GC (3)     |
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      | static memory ...                                           >>>
      |                                                             >>>
(1)-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
(2):  | heap ...                                                      $
(3):  |                                                               $
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

Means that the first 8 bytes are reserved for NULL, followed by 8 bytes each
holding the heap offset (1), the allocated mspace structure offset (2) and the
allocated tgc structure offset (3). These are always aligned to 8 bytes just in
case even when compiling for WASM32 that stores 32-bit LE integers here.

Static memory follows at offset 32, if any, again followed by the heap. The
heap is not necessarily aligned to 32 bytes as the table might suggest.

Setup is done by calling init() from the WebAssembly start function. It takes
the pre-calculated heap offset from memory and configures the runtime
accordingly by setting `_MSPACE` and `_GC` to their respective values.

API
---

Core runtime:

* **init**(): `void`
* **memcmp**(vl: `uintptr`, vr: `uintptr`, n: `uintptr`): `int`
* **memcpy**(dest: `uintptr`, src: `uintptr`, n: `uintptr`): `uintptr`
* **memset**(dest: `uintptr`, c: `int`, n: `uintptr`): `uintptr`
* **malloc**(size: `uintptr`): `uintptr`
* **realloc**(ptr: `uintptr`, size: `uintptr`): `uintptr`
* **free**(ptr: `uintptr`): `void`

Experimental garbage collector runtime:

* **gc_pause**(): `void`
* **gc_resume**(): `void`
* **gc_collect**(): `void`
* **gc_alloc**(size: `uintptr`, flags: `int`): `uintptr`
* **gc_realloc**(ptr: `uintptr`, size: `uintptr`): `uintptr`
* **gc_retain**(ptr: `uintptr`): `uintptr`
* **gc_release**(ptr: `uintptr`): `uintptr`

In the final WebAssembly binary, runtime function names are prefixed with a dot to avoid conflicts with user-defined functions.

Building
--------

```
$> npm run build:runtime
```
