//! { "memoryModel": "importmalloc" }

export function test(): int[] {
  return [1, 2, , 3];
}

export function testNested(): int[][] {
  return [[1, 2, , 3], [4], []];
}
