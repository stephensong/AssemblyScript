import { Compiler } from "../src/compiler";

const module = Compiler.compileString(`
export function test(a: int): int {
  return a;
}
`, { noLib: true });

if (module) {
  module.optimize();
  console.log(module.emitText());
}
