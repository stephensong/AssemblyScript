//! { "noRuntime": true }

export function testDo(n: int): int {
  let i: int = 0;
  do {
    i = i + 1;
  } while (i < n);
  return i;
}

export function testWhile(n: int): int {
  let i: int = 0;
  while (i < n) {
    i = i + 1;
  }
  return i;
}

export function testWhileEmpty(): void {
  while (false);
  while (true);
}

export function testFor(n: int): int {
  for (let i: int = 0; i < n; ++i) { }

  let j: int = 0;
  for (; j < n; ++j) {}

  for (j = 0; j < n; ++j) {}

  for (j = 0; j < n;) {
    j++;
  }

  for (;;) break;

  return j;
}
