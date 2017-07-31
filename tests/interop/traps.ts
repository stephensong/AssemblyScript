//! { "memoryModel": "exportmalloc" }

export function i32_trunc_s_f32(): int {
  const a: float = 4294967296.0;
  return a as int; // traps
}

export function i32_trunc_u_f32(): uint {
  const a: float = 4294967296.0;
  return a as uint; // traps
}

export function stmt_unreachable(): void {
  unreachable();
}

export function div_by_zero(): int {
  const a: int = 123;
  return a / 0;
}

export function rem_by_zero(): int {
  const a: int = 123;
  return a % 0;
}

export function div_overflow(): int {
  const a: int = -2147483648;
  return a / - 1;
}

export function oob_access(): int {
  const a: int[] = new Array(0);
  return a[16384];
}
