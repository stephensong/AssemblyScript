//! { "memoryModel": "bare" }

export function test(a: int, b: float): bool {
  if (a && b)
    return true;
  return false;
}
