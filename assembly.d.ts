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

// Type aliases
declare type int8 = sbyte;
declare type uint8 = byte;
declare type int16 = short;
declare type uint16 = ushort;
declare type int32 = int;
declare type uint32 = uint;
declare type int64 = long;
declare type uint64 = ulong;
declare type float32 = float;
declare type float64 = double;

declare class Array<T> {
  readonly length: uint;
  constructor(size: uint);
}

declare class Int8Array extends Array<sbyte> {}
declare class Uint8Array extends Array<byte> {}
declare class Buffer extends Uint8Array {}
declare class Int16Array extends Array<short> {}
declare class Uint16Array extends Array<ushort> {}
declare class Int32Array extends Array<int> {}
declare class Uint32Array extends Array<uint> {}
declare class Int64Array extends Array<long> {}
declare class Uint64Array extends Array<ulong> {}
declare class Float32Array extends Array<float> {}
declare class Float64Array extends Array<double> {}

declare class String extends Array<ushort> {
  readonly length: uint;
  constructor(size: uint);
}

// Fillers for TypeScript complaining about missing types with 'nolib'
declare abstract class Boolean {}
declare abstract class Function {}
declare abstract class IArguments {}
declare abstract class Number {}
declare abstract class Object {}
declare abstract class RegExp {}

// Builtins
declare function rotl(value: int, shift: int): int;
declare function rotll(value: long, shift: long): long;
declare function rotr(value: int, shift: int): int;
declare function rotrl(value: long, shift: long): long;
declare function clz(value: int): int;
declare function clzl(value: long): long;
declare function ctz(value: int): int;
declare function ctzl(value: long): long;
declare function popcnt(value: int): int;
declare function popcntl(value: long): long;
declare function abs(value: double): double;
declare function absf(value: float): float;
declare function ceil(value: double): double;
declare function ceilf(value: float): float;
declare function floor(value: double): double;
declare function floorf(value: float): float;
declare function sqrt(value: double): double;
declare function sqrtf(value: float): float;
declare function trunc(value: double): double;
declare function truncf(value: float): float;
declare function nearest(value: double): double;
declare function nearestf(value: float): float;
declare function min(left: double, right: double): double;
declare function minf(left: float, right: float): float;
declare function max(left: double, right: double): double;
declare function maxf(left: float, right: float): float;
declare function copysign(left: double, right: double): double;
declare function copysignf(left: float, right: float): float;
declare function reinterpreti(value: float): int;
declare function reinterpretl(value: double): long;
declare function reinterpretf(value: int): float;
declare function reinterpretd(value: long): double;
declare function current_memory(): int;
declare function grow_memory(value: int): int;
declare function sizeof<T>(): uintptr;

// Linked-in standard library
declare function memset(dest: uintptr, c: int, size: uintptr): uintptr;
declare function memcpy(dest: uintptr, src: uintptr, size: uintptr): uintptr;
declare function memcmp(left: uintptr, right: uintptr, size: uintptr): int;
declare function malloc(size: uintptr): uintptr;
declare function free(ptr: uintptr): void;
