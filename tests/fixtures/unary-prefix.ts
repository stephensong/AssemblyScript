//! { "noRuntime": true }

export function testInt(a: int): void {
  let b: int;
  let c: bool;

  // should be dropped
  !a;
  +a; // noop
  -a;
  ~a;

  // should be kept
  c = !a;
  b = +a;
  b = -a;
  b = ~a;

  // should become a set_local
  ++a;
  --a;

  // should become a tee_local
  b = ++a;
  b = --a;
}

export function testLong(a: long): void {
  let b: long;
  let c: bool;

  // should be dropped
  !a;
  +a; // noop
  -a;
  ~a;

  // should be kept
  c = !a;
  b = +a;
  b = -a;
  b = ~a;

  // should become a set_local
  ++a;
  --a;

  // should become a tee_local
  b = ++a;
  b = --a;
}

export function testFloat(a: float): void {
  let b: float;
  let c: bool;

  // should be dropped
  !a;
  +a; // noop
  -a;

  // should be kept
  c = !a;
  b = +a;
  b = -a;

  // should become a set_local
  ++a;
  --a;

  // should become a tee_local
  b = ++a;
  b = --a;
}

export function testDouble(a: double): void {
  let b: double;
  let c: bool;

  // should be dropped
  !a;
  +a; // noop
  -a;

  // should be kept
  c = !a;
  b = +a;
  b = -a;

  // should become a set_local
  ++a;
  --a;

  // should become a tee_local
  b = ++a;
  b = --a;
}
