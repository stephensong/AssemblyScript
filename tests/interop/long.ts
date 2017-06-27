//! { "memoryModel": "exportmalloc" }

let a: long[] = new Array(1);

function start(): void {
  a[0] = 9223372036854775807;
}

export function getLongArray(): long[] {
  return a;
}
