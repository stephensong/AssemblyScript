import { Compiler } from "../compiler";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileParenthesized(compiler: Compiler, node: ts.ParenthesizedExpression, contextualType: wasm.Type): binaryen.Expression {
  const expression = compiler.compileExpression(node.expression, contextualType);

  (<any>node).wasmType = (<any>node.expression).wasmType;
  return expression;
}
