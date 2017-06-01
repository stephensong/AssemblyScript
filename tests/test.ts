/// <reference path="../assembly.d.ts" />

import { Hello } from "./import";

var aGlobal: int = 1;

export function main(): uintptr {
  return sizeof<uintptr>();
}
