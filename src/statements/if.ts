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

  return op.if(
    compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), (<any>node.expression).wasmType, intType, true),
    compiler.compileStatement(node.thenStatement, onVariable),
    node.elseStatement ? compiler.compileStatement(node.elseStatement, onVariable) : undefined
  );
}
