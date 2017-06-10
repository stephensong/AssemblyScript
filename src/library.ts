/** Source of assembly.d.ts for in-browser usage. */
export const libSource = `// TypeScript definition file for AssemblyScript compilation.
// see: https://github.com/dcodeIO/AssemblyScript for details

// Core types

/** An 8-bit signed integer. */
declare type sbyte = number;
/** An 8-bit unsigned integer. */
declare type byte = number;
/** A 16-bit signed integer. */
declare type short = number;
/** A 16-bit unsigned integer. */
declare type ushort = number;
/** A 32-bit signed integer. */
declare type int = number;
/** A 32-bit unsigned integer. */
declare type uint = number;
/** A 64-bit signed integer. */
declare type long = number;
/** A 64-bit unsigned integer. */
declare type ulong = number;
/** A 1-bit unsigned integer. */
declare type bool = boolean;
/** A 32-bit float. */
declare type float = number;
/** A 64-bit float. */
declare type double = number;
/** A 32-bit unsigned integer when targeting WASM32 respectively a 64-bit unsigned integer when targeting WASM64. */
declare type uintptr = number;

// Core type aliases

/** An 8-bit signed integer. */
declare type int8 = sbyte;
/** An 8-bit unsigned integer. */
declare type uint8 = byte;
/** A 16-bit signed integer. */
declare type int16 = short;
/** A 16-bit unsigned integer. */
declare type uint16 = ushort;
/** A 32-bit signed integer. */
declare type int32 = int;
/** A 32-bit signed integer. */
declare type uint32 = uint;
/** A 64-bit signed integer. */
declare type int64 = long;
/** A 64-bit unsigned integer. */
declare type uint64 = ulong;
/** A 32-bit float. */
declare type float32 = float;
/** A 64-bit float. */
declare type float64 = double;

// Arrays

/** A fixed-size array. */
declare class Array<T> implements IDisposable {
  readonly length: uintptr;
  constructor(size: uintptr);
  dispose(): void;
}

/** A fixed-size 8-bit signed integer array. */
declare class Int8Array extends Array<sbyte> {}
/** A fixed-size 8-bit unsigned integer array. */
declare class Uint8Array extends Array<byte> {}
/** A fixed-size 16-bit signed integer array. */
declare class Int16Array extends Array<short> {}
/** A fixed-size 16-bit unsigned integer array. */
declare class Uint16Array extends Array<ushort> {}
/** A fixed-size 32-bit signed integer array. */
declare class Int32Array extends Array<int> {}
/** A fixed-size 32-bit unsigned integer array. */
declare class Uint32Array extends Array<uint> {}
/** A fixed-size 64-bit signed integer array. */
declare class Int64Array extends Array<long> {}
/** A fixed-size 64-bit unsigned integer array. */
declare class Uint64Array extends Array<ulong> {}
/** A fixed-size 32-bit float array. */
declare class Float32Array extends Array<float> {}
/** A fixed-size 64-bit float array. */
declare class Float64Array extends Array<double> {}
/** A fixed-size 8-bit unsigned integer array. */
declare class Buffer extends Uint8Array {}

// Strings

/** A fixed-size utf16-le encoded string. */
declare class String extends Uint16Array {
  readonly length: uintptr;
  constructor(size: uintptr);
}

// Builtins

/** Performs the sign-agnostic rotate left operation on a 32-bit integer. */
declare function rotl(value: int, shift: int): int;
/** Performs the sign-agnostic rotate left operation on a 64-bit integer. */
declare function rotll(value: long, shift: long): long;
/** Performs the sign-agnostic rotate right operation on a 32-bit integer. */
declare function rotr(value: int, shift: int): int;
/** Performs the sign-agnostic rotate right operation on a 64-bit integer. */
declare function rotrl(value: long, shift: long): long;
/** Performs the sign-agnostic count leading zero bits operation on a 32-bit integer. All zero bits are considered leading if the value is zero. */
declare function clz(value: int): int;
/** Performs the sign-agnostic count leading zero bits operation on a 64-bit integer. All zero bits are considered leading if the value is zero. */
declare function clzl(value: long): long;
/** Performs the sign-agnostic count trailing zero bits operation on a 32-bit integer. All zero bits are considered trailing if the value is zero. */
declare function ctz(value: int): int;
/** Performs the sign-agnostic count trailing zero bits operation on a 64-bit integer. All zero bits are considered trailing if the value is zero. */
declare function ctzl(value: long): long;
/** Performs the sign-agnostic count number of one bits operation on a 32-bit integer. */
declare function popcnt(value: int): int;
/** Performs the sign-agnostic count number of one bits operation on a 64-bit integer. */
declare function popcntl(value: long): long;
/** Computes the absolute value of a 64-bit float. */
declare function abs(value: double): double;
/** Computes the absolute value of a 32-bit float. */
declare function absf(value: float): float;
/** Performs the ceiling operatoion on a 64-bit float. */
declare function ceil(value: double): double;
/** Performs the ceiling operation on a 32-bit float. */
declare function ceilf(value: float): float;
/** Performs the floor operation on a 64-bit float. */
declare function floor(value: double): double;
/** Performs the floor operation on a 32-bit float. */
declare function floorf(value: float): float;
/** Calculates the square root of a 64-bit float. */
declare function sqrt(value: double): double;
/** Calculates the square root of a 32-bit float. */
declare function sqrtf(value: float): float;
/** Rounds to nearest integer towards zero of a 64-bit float. */
declare function trunc(value: double): double;
/** Rounds to nearest integer towards zero of a 32-bit float. */
declare function truncf(value: float): float;
/** Rounds to nearest integer tied to even of a 64-bit float. */
declare function nearest(value: double): double;
/** Rounds to nearest integer tied to even of a 32-bit float. */
declare function nearestf(value: float): float;
/** Determines the minimum of two 64-bit floats. If either operand is NaN, returns NaN. */
declare function min(left: double, right: double): double;
/** Determines the minimum of two 32-bit floats. If either operand is NaN, returns NaN. */
declare function minf(left: float, right: float): float;
/** Determines the maximum of two 64-bit floats. If either operand is NaN, returns NaN. */
declare function max(left: double, right: double): double;
/** Determines the maximum of two 32-bit floats. If either operand is NaN, returns NaN. */
declare function maxf(left: float, right: float): float;
/** Composes a 64-bit float from the magnitude of \`x\` and the sign of \`y\`. */
declare function copysign(x: double, y: double): double;
/** Composes a 32-bit float from the magnitude of \`x\` and the sign of \`y\`. */
declare function copysignf(x: float, y: float): float;
/** Reinterprets the bits of a 32-bit float as a 32-bit integer. */
declare function reinterpreti(value: float): int;
/** Reinterprets the bits of a 64-bit float as a 64-bit integer. */
declare function reinterpretl(value: double): long;
/** Reinterprets the bits of a 32-bit integer as a 32-bit float. */
declare function reinterpretf(value: int): float;
/** Reinterprets the bits of a 64-bit integer as a 64-bit double. */
declare function reinterpretd(value: long): double;
/** Returns the current memory size in units of pages. One page is 64kb. */
declare function current_memory(): int;
/** Grows linear memory by a given unsigned delta of pages. One page is 64kb. Returns the previous memory size in units of pages or \`-1\` on failure. */
declare function grow_memory(value: uint): int;
/** Returns the byte size of the specified core or class type. */
declare function sizeof<T>(): uintptr;

// tbd.
/** UNSAFE - Casts a class to a pointer. */
// declare function __deref<T>(value: T): uintptr;
/** UNSAFE - Casts a pointer to a class. */
// declare function __ref<T>(ptr: uintptr): T;

// Standard library

/** Sets a chunk of memory to the provided value \`c\`. Usually used to reset it to all \`0\`s. */
declare function memset(dest: uintptr, c: int, size: uintptr): uintptr;
/** Copies data from one chunk of memory to another. */
declare function memcpy(dest: uintptr, src: uintptr, size: uintptr): uintptr;
/** Compares a chunk of memory to another. Returns \`0\` if both are equal, otherwise the difference \`vl[i] - vr[i]\` of the first differing byte values. */
declare function memcmp(left: uintptr, right: uintptr, size: uintptr): int;
/** Allocates a chunk of memory of the specified size and returns a pointer to it. */
declare function malloc(size: uintptr): uintptr;
/** Frees a previously allocated chunk of memory by its pointer. */
declare function free(ptr: uintptr): void;

// Temporary fillers

declare abstract class Boolean {}
declare abstract class Function {}
declare abstract class IArguments {}
declare abstract class Number {}
declare abstract class Object {}
declare abstract class RegExp {}

// Interfaces

declare interface IDisposable {
  dispose(): void;
}
`;

/** Precompiled malloc.wasm as a base64-encoded string. */
export const mallocBlob = "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AS0ADjoADiACIAEtAAA6AAAgAiABLQAPOgAPIAJBEGohAiABQRBqIQELIARBCHEEQCACIAEtAAA6AAAgAiABLQABOgABIAIgAS0AAjoAAiACIAEtAAM6AAMgAiABLQAEOgAEIAIgAS0ABToABSACIAEtAAY6AAYgAiABLQAHOgAHIAJBCGohAiABQQhqIQELIARBBHEEQCACIAEtAAA6AAAgAiABLQABOgABIAIgAS0AAjoAAiACIAEtAAM6AAMgAkEEaiECIAFBBGohAQsgBEECcQRAIAIgAS0AADoAACACIAEtAAE6AAEgAkECaiECIAFBAmohAQsgBEEBcUUNACACIAEtAAA6AAAgAA8LIAALC/+CgIAAAgJ/AX4CfwJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhAgAyABNgIMIAMgATYCFCADIAE2AhggAkFoaiABNgIAIAJBZGogATYCACACQWxqIAE2AgAgAkFwaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDACABQQhqIAU3AwAgAUEQaiAFNwMAIAFBGGogBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACwu+tYCAAAEKfwJ/QcAAKAIAQRBrIQcCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAUH0AU0EQCAAKAIAIgRBECABQQtqQXhxIAFBC0kbIgVBA3YiAnYiAUEDcUUNASAAIAFBf3NBAXEgAmoiA0EDdGoiBUEwaigCACIBQQhqIQYgASgCCCICIAVBKGoiBUYNAiAAKAIQIAJLDQMgAigCDCABRw0DIAVBCGogAjYCACACQQxqIAU2AgAM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";