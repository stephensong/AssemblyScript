[AssemblyScript](https://github.com/dcodeIO/AssemblyScript)'s memory management runtime in C based on [musl](http://www.musl-libc.org/), [dlmalloc](http://g.oswego.edu/dl/html/malloc.html) and [tgc](https://github.com/orangeduck/tgc).

Memory layout
-------------

```
                                       1               2
       0               8               6               4
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      ^ NULL          | HEAP     (1)  | MSPACE (2)    | GC     (3)    |
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
accordingly by setting MSPACE and GC to their respective values.
