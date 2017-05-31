/// <reference path="../assembly.d.ts" />

export function main(size: uintptr): uintptr {
  return malloc(size);
}
