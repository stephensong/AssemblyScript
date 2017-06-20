import { Compiler } from "../src/compiler";

const module = Compiler.compileString(`
export function test(a: int): int {
  return a;
}

function start(): void {}
`);

if (module) {
  module.optimize();
  console.log(module.emitText());
}
