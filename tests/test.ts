/*class BaseClass {
  baseProperty: int;

  constructor(a: int) {
  }

  baseMethod<T>(): void {
  }
}

class SubClass extends BaseClass {
  subProperty: float;

  constructor(a: int, b: int) {
    super(a);
  }

  subMethod(): void {
    this.baseMethod<float>();
  }
}

export function classTest(): void {
  let c: BaseClass = new SubClass(1, 2);
  c.baseMethod<int>();
}*/
/*
export function main(): void {
  // let s: string = "123";
  let a: Array<int> = new Array(10);
  let b: uintptr = a.indexOf(1, 0);
  used();
}

function used(): void {}
function unused(): void {}
*/
/*
export function stringTest(): void {
  let s: string = "123";
  s.startsWith("1");
  // let a: Array<int> = new Array(10);
}
*/
export function testDouble(): double {
  let a: double = 4;
  let b: double = 5;
  if(a == b)
    return a;
  return b;
}
export function testLong(): double {
  let a: long = 4;
  let b: long = 5;
  if(a == b)
    return a as double;
  return b as double;
}
export function testNaN(value: double): bool {
  return isNaN(-value);
}
export function testFinite(value: double): bool {
  return isFinite(-value);
}
