//! { "noRuntime": true }

class A {
  static a: int;
}

export function test(): void {
  A.a;
  A.a = 1;
}
