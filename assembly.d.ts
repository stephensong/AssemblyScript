// TypeScript definition file for AssemblyScript compilation.
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
declare class Array<T> {
  readonly length: uint;
  constructor(size: uint);
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
  readonly length: uint;
  constructor(size: uint);
}

// Builtins

/** Sign-agnostic rotate left of a 32-bit integer. */
declare function rotl(value: int, shift: int): int;
/** Sign-agnostic rotate left of a 64-bit integer. */
declare function rotll(value: long, shift: long): long;
/** Sign-agnostic rotate right of a 32-bit integer. */
declare function rotr(value: int, shift: int): int;
/** Sign-agnostic rotate right of a 64-bit integer. */
declare function rotrl(value: long, shift: long): long;
/** Sign-agnostic count leading zero bits of a 32-bit integer. All zero bits are considered leading if the value is zero. */
declare function clz(value: int): int;
/** Sign-agnostic count leading zero bits of a 64-bit integer. All zero bits are considered leading if the value is zero. */
declare function clzl(value: long): long;
/** Sign-agnostic count trailing zero bits of a 32-bit integer. All zero bits are considered trailing if the value is zero. */
declare function ctz(value: int): int;
/** Sign-agnostic count trailing zero bits of a 64-bit integer. All zero bits are considered trailing if the value is zero. */
declare function ctzl(value: long): long;
/** Sign-agnostic count number of one bits of a 32-bit integer. */
declare function popcnt(value: int): int;
/** Sign-agnostic count number of one bits of a 64-bit integer. */
declare function popcntl(value: long): long;
/** Absolute value of a 64-bit float. */
declare function abs(value: double): double;
/** Absolute value of a 32-bit float. */
declare function absf(value: float): float;
/** Ceiling operator of a 64-bit float. */
declare function ceil(value: double): double;
/** Ceiling operator of a 32-bit float. */
declare function ceilf(value: float): float;
/** Floor operator of a 64-bit float. */
declare function floor(value: double): double;
/** Floor operator of a 32-bit float. */
declare function floorf(value: float): float;
/** Square root of a 64-bit float. */
declare function sqrt(value: double): double;
/** Square root of a 32-bit float. */
declare function sqrtf(value: float): float;
/** Round to nearest integer towards zero of a 64-bit float. */
declare function trunc(value: double): double;
/** Round to nearest integer towards zero of a 32-bit float. */
declare function truncf(value: float): float;
/** Round to nearest integer, ties to even, of a 64-bit float. */
declare function nearest(value: double): double;
/** Round to nearest integer, ties to even, of a 32-bit float. */
declare function nearestf(value: float): float;
/** Minimum binary operator of two 64-bit floats. If either operand is NaN, returns NaN. */
declare function min(left: double, right: double): double;
/** Minimum binary operator of two 32-bit floats. If either operand is NaN, returns NaN. */
declare function minf(left: float, right: float): float;
/** Maximum binary operator of two 64-bit floats. If either operand is NaN, returns NaN. */
declare function max(left: double, right: double): double;
/** Maximum binary operator of two 32-bit floats. If either operand is NaN, returns NaN. */
declare function maxf(left: float, right: float): float;
/** Copysign binary operator of two 64-bit floats. */
declare function copysign(left: double, right: double): double;
/** Copysign binary operator of two 32-bit floats. */
declare function copysignf(left: float, right: float): float;
/** Reinterprets the bits of a 32-bit float as a 32-bit integer. */
declare function reinterpreti(value: float): int;
/** Reinterprets the bits of a 64-bit float as a 64-bit integer. */
declare function reinterpretl(value: double): long;
/** Reinterprets the bits of a 32-bit integer as a 32-bit float. */
declare function reinterpretf(value: int): float;
/** Reinterprets the bits of a 64-bit integer as a 64-bit double. */
declare function reinterpretd(value: long): double;
/** Returns the current memory size in units of pages (one page is 64kb). */
declare function current_memory(): int;
/** Grow linear memory by a given unsigned delta of pages (one page is 64kb). Returns the previous memory size in units of pages or `-1` on failure. */
declare function grow_memory(value: int): int;
/** Returns the byte size of the specified core or class type. */
declare function sizeof<T>(): uintptr;

// Standard library

/** Sets a chunk of memory to the provided value `c`. Usually used to reset it to all `0`s. */
declare function memset(dest: uintptr, c: int, size: uintptr): uintptr;
/** Copies data from one chunk of memory to another. */
declare function memcpy(dest: uintptr, src: uintptr, size: uintptr): uintptr;
/** Compares a chunk of memory to another. Returns `0` if both are equal, otherwise the difference `vl[i] - vr[i]` of the first differing byte values. */
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
