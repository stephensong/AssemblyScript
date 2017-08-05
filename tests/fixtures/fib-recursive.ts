//! { "noRuntime": true }

export function test(num: int): int {
  if (num <= 1) return 1;
  return test(num - 1) + test(num - 2);
}
