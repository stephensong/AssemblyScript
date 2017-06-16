class BaseClass {
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

export function main(): int {
  let c: BaseClass = new SubClass(1, 2);
  c.baseMethod<int>();
  let a: Uint32Array = new Uint32Array(10);
  return a.length as int;
}