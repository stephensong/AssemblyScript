//! { "memoryModel": "bare" }

export function test(a: int, b: int): int {
  return a > b
    ? a == b
      ? 0
      : 1
    : -1 as ushort;
}
