import { Compiler } from "../src/compiler";

const compiled = Compiler.compileString(`
export function test(a: int): int {
  return a;
}
`).emitText();

console.log(compiled);
