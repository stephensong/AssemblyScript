import {
  Compiler
} from "../compiler";

import {
  intType
} from "../types";

import {
  WasmType,
  WasmStatement
} from "../wasm";

export function compileIf(compiler: Compiler, node: ts.IfStatement, onVariable: (node: ts.VariableDeclaration) => number): WasmStatement {
  const op = compiler.module;

  const condition = compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), (<any>node.expression).wasmType, intType, true);
  const ifTrue = compiler.compileStatement(node.thenStatement, onVariable) || op.nop();
  const ifFalse = node.elseStatement ? compiler.compileStatement(node.elseStatement, onVariable) : undefined;

  // TODO: If 'ifTrue' is empty and 'ifFalse' is present, invert them and negate 'condition'

  return op.if(
    condition,
    ifTrue,
    ifFalse || undefined
  );
}
