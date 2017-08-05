//! { "noRuntime": true }

class A {
  a(): void {}
}

export function test(b: A): void {
  b.a();
}
