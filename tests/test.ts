/// <reference path="../assembly.d.ts" />

import { Hello } from "./import";

export function main(): uintptr {
  return sizeof<uintptr>();
}
