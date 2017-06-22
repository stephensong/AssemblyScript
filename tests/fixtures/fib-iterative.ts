//! { "malloc": false }

export function test(n: int): int {
  let i: int, t: int, a: int = 0, b: int = 1;
  for (i = 0; i < n; i++) {
    t = a + b; a = b; b = t;
  }
  return b;
}
