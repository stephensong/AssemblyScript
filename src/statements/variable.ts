import { Compiler } from "../compiler";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";

export function compileVariable(compiler: Compiler, node: ts.VariableStatement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  const op = compiler.module;
  const initializers: binaryen.Expression[] = [];

  for (let i = 0, k = node.declarationList.declarations.length; i < k; ++i) {
    const declaration = node.declarationList.declarations[i];
    const declarationType = compiler.resolveType(declaration.type);

    setWasmType(declaration, declarationType);

    const index = onVariable(declaration);
    if (declaration.initializer)
      initializers.push(op.setLocal(index, compiler.compileExpression(declaration.initializer, declarationType)));
  }

  return initializers.length === 0 ? null
       : initializers.length === 1 ? initializers[0]
       : op.block("", initializers); // praise rule #1
}
