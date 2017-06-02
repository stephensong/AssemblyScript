export class Hello {
  constructor() {
  }

  world(param: int): int {
    this.anotherVoid();
    Hello.anotherStaticVoid();
    let a: int = 1;
    while (a) {
      return a;
    }
    return 2;
  }

  anotherVoid(): void {
  }

  static anotherStaticVoid(): void {
  }
}

const aConstGlobalInAnImport: int = 2;
let aGlobalInAnImport: byte = 3;