![AssemblyScript](https://raw.githubusercontent.com/dcodeIO/AssemblyScript/master/logo.png)
==============
AssemblyScript defines a subset of [TypeScript](https://github.com/Microsoft/TypeScript) that it compiles to [WebAssembly](http://webassembly.org/). The compiler itself is written in TypeScript and no binary dependencies are required to get started. Under the hood, it rewires TypeScript's [compiler API](https://github.com/Microsoft/TypeScript-wiki/blob/master/Using-the-Compiler-API.md) to [binaryen](https://github.com/WebAssembly/binaryen)'s compiler infrastructure.

Be warned that this is an early prototype and that it cannot do anything useful yet.

Example
-------

```ts
/// <reference path="node_modules/assemblyscript/assembly.d.ts" />

export function add(a: int, b: double): short {
  return (a + (b as int)) as short;
}
```

Compiles to:

```s
(module
 (type $iFi (func (param i32 f64) (result i32)))
 (memory $0 256)
 (export "memory" (memory $0))
 (export "add" (func $add))
 (func $add (type $iFi) (param $0 i32) (param $1 f64) (result i32)
  (return
   (i32.shl
    (i32.shr_s
     (i32.add
      (get_local $0)
      (i32.trunc_s/f64
       (get_local $1)
      )
     )
     (i32.const 16)
    )
    (i32.const 16)
   )
  )
 )
)
```

Usage
-----
An AssemblyScript program is valid TypeScript syntactically, but not necessarily semantically.

WebAssembly-specific types are obtained by referencing [assembly.d.ts](./assembly.d.ts):

Type      | Native type | Description
----------|-------------|-------------
`sbyte`   | i32         | An 8-bit signed integer.
`byte`    | i32         | An 8-bit unsigned integer.
`short`   | i32         | A 16-bit signed integer.
`ushort`  | i32         | A 16-bit unsigned integer.
`int`     | i32         | A 32-bit signed integer.
`uint`    | i32         | A 32-bit unsigned integer.
`long`    | i64         | A 64-bit signed integer.
`ulong`   | i64         | A 64-bit unsigned integer.
`bool`    | i32         | A 1-bit unsigned integer.
`uintptr` | i32 / i64   | A 32-bit unsigned integer when targeting 32-bit WebAssembly.<br />A 64-bit unsigned integer when targeting 64-bit WebAssembly.
`float`   | f32         | A 32-bit float.
`double`  | f64         | A 64-bit float.
`void`    | none        | No return type.

WebAssembly-specific operations are available as built-in functions that translate to the respective opcode directly:

Function                                        | Opcode
------------------------------------------------|----------
`rotl(value: int, shift: int): int`             | i32.rotl
`rotll(value: long, shift: long): long`         | i64.rotl
`rotr(value: int, shift: int): int`             | i32.rotr
`rotrl(value: long, shift: long): long`         | i64.rotr
`clz(value: int): int`                          | i32.clz
`clzl(value: long): long`                       | i64.clz
`ctz(value: int): int`                          | i32.ctz
`ctzl(value: long): long`                       | i64.ctz
`popcnt(value: int): int`                       | i32.popcnt
`popcntl(value: long): long`                    | i64.popcnt
`abs(value: double): double`                    | f64.abs
`absf(value: float): float`                     | f32.abs
`ceil(value: double): double`                   | f64.ceil
`ceilf(value: float): float`                    | f32.ceil
`floor(value: double): double`                  | f64.floor
`floorf(value: float): float`                   | f32.floor
`sqrt(value: double): double`                   | f64.sqrt
`sqrtf(value: float): float`                    | f32.sqrt
`trunc(value: double): double`                  | f64.trunc
`truncf(value: float): float`                   | f32.trunc
`nearest(value: double): double`                | f64.nearest
`nearestf(value: float): float`                 | f32.nearest
`min(left: double, right: double): double`      | f64.min
`minf(left: float, right: float): float`        | f32.min
`max(left: double, right: double): double`      | f64.max
`maxf(left: float, right: float): float`        | f32.max
`copysign(left: double, right: double): double` | f64.copysign
`copysignf(left: float, right: float): float`   | f32.copysign
`reinterpreti(value: float): int`               | i32.reinterpret/f32
`reinterpretl(value: double): long`             | i64.reinterpret/f64
`reinterpretf(value: int): float`               | f32.reinterpret/i32
`reinterpretd(value: long): double`             | f64.reinterpret/i64
`sizeof<T>(): uintptr`                          | -

By default (i.e. if the `--nolib` option isn't set), standard memory management routines based on [dlmalloc](http://g.oswego.edu/dl/html/malloc.html) and [musl](http://www.musl-libc.org/) will be linked statically and exported to the embedder:

* `malloc(size: uintptr): uintptr`<br />Allocates a chunk of memory of the specified size and returns a pointer to it.
* `free(ptr: uintptr): void`<br />Frees a previously allocated chunk of memory by its pointer.
* `memcpy(dest: uintptr, src: uintptr, size: uintptr): uintptr`<br />Copies data from one chunk of memory to another.
* `memset(dest: uintptr, c: int, size: uintptr): uintptr`<br />Sets a chunk of memory to the provided value `c` (usually used to reset it to all `0`s).
* `memcmp(vl: uintptr, vr: uintptr, n: uintptr): int`<br />Compares a chunk of memory to another. Returns `0` if both are equal, otherwise the difference of the first differing byte value (`vl[i] - vr[i]`).

Linking in these memory management routines adds about 11kb to a module. Once WebAssembly exposes the garbage collector natively, there'll be other options as well.

Type coercion requires an explicit cast where precision or signage is lost respectively is implicit where it is maintained. For example, to cast a `double` to an `int`:

```ts
function example(value: double): int {
  return value as int; // translates to the respective opcode(s)
}
```

Global WebAssembly imports can be `declare`d anywhere while WebAssembly exports are `export`ed from the entry file (the file specified when calling `asc` or `Compiler.compile`). Aside from that, imports and exports work just like in TypeScript.

```ts
// entry.ts

import { myOtherExportThatDoesntBecomeAWebAssemblyExport } from "./imported";

declare function myImport(): void;

export function myExport(): void {
  myOtherExportThatDoesntBecomeAWebAssemblyExport();
}
```

Currently, imports can also be pulled from different namespaces by separating the namespace and the function with a `$` character.

```ts
declare function Math$random(): double;
```

Naming a function `start` with no arguments and a `void` return type will automatically make it the start function that is being called on load even before returning to the embedder.

```ts
function start(): void {
  ...
}
```

Command line
------------
The command line compiler is named `asc` following TypeScript's `tsc`.

```
Syntax: asc [options] [file ...]

Options:
 -o, --out, --outFile   Specifies the output file name.
 -v, --validate         Validates the module.
 -O, --optimize         Runs optimizing binaryen IR passes.
 -t, --text             Emits text format instead of a binary.
```

---

That's it for now. Feel free to experiment. PRs welcome!

License: [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0)
