//! { "noRuntime": true }

export function test1(a: int): int {
  switch (a) {
    case 3:
      return 3;
    case 1:
      return 1;
    default:
      switch (a) {
        case 0:
          break;
        /* default:
          return 42; */
        case 4:
          return 4;
        case 5:
        case 6:
          return 56;
      }
      return 0;
    case 2:
      return 2;
  }
}

export function test2(a: int): int {
  switch (a) {
    case 1:
      return 1;
    default:
    case 2:
      a = 2;
  }
  return a;
}
