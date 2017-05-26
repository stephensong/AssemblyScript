import {
  Compiler
} from "../compiler";

import {
  intType
} from "../types";

import {
  WasmType,
  WasmExpression
} from "../wasm";

export function compile(compiler: Compiler, node: ts.ConditionalExpression, contextualType: WasmType): WasmExpression {
  const op = compiler.module;

  const condition = compiler.maybeConvertValue(
    node.condition,
    compiler.compileExpression(node.condition, intType),
    (<any>node.condition).wasmType,
    intType,
    true
  );
  const ifTrue  = compiler.compileExpression(node.whenTrue, contextualType);
  const ifFalse = compiler.compileExpression(node.whenFalse, contextualType);

  (<any>node).wasmType = contextualType;
  return op.select(condition, ifTrue, ifFalse);
}
