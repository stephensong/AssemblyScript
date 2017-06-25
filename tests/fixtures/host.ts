//! { "memoryModel": "bare" }

export function test(a: int): int {
  let b: int = grow_memory(a);
  return current_memory();
}
