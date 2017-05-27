/// <reference path="../assembly.d.ts" />

export function assignmentTest(): void {
  let a: int = 1;
  let b: int = a;
  b = (a = b);
}

type f64 = double;

export function typeAlias(a: f64): float {
  type f32 = float;
  let b: f32 = a as float;
  return b;
}

function start(): void {

}