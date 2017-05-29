import { Compiler } from "../compiler";
import { intType } from "../types";
import { getWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileIf(compiler: Compiler, node: ts.IfStatement, onVariable: (name: string, type: wasm.Type) => number): binaryen.Statement {
  const op = compiler.module;
  return op.if(
    compiler.maybeConvertValue(node.expression, compiler.compileExpression(node.expression, intType), getWasmType(node.expression), intType, true),
    compiler.compileStatement(node.thenStatement, onVariable),
    node.elseStatement ? compiler.compileStatement(node.elseStatement, onVariable) : undefined
  );
}
