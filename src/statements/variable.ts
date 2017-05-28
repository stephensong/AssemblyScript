import { Compiler } from "../compiler";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";

export function compileVariableDeclarationList(compiler: Compiler, node: ts.VariableDeclarationList,  onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  const op = compiler.module;
  const initializers: binaryen.Expression[] = [];

  for (let i = 0, k = node.declarations.length; i < k; ++i) {
    const declaration = node.declarations[i];
    const declarationType = compiler.resolveType(declaration.type);

    setWasmType(declaration, declarationType);

    const index = onVariable(declaration);
    if (declaration.initializer)
      initializers.push(op.setLocal(index, compiler.compileExpression(declaration.initializer, declarationType)));
  }

  return initializers.length === 0 ? op.nop()
       : initializers.length === 1 ? initializers[0]
       : op.block("", initializers); // praise rule #1
}

export function compileVariable(compiler: Compiler, node: ts.VariableStatement, onVariable: (node: ts.VariableDeclaration) => number): binaryen.Statement {
  return compileVariableDeclarationList(compiler, node.declarationList, onVariable);
}
