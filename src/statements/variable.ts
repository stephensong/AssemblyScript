import { Compiler } from "../compiler";
import { getWasmType, setWasmType } from "../util";
import { binaryen } from "../wasm";
import * as wasm from "../wasm";

export function compileVariableDeclarationList(compiler: Compiler, node: ts.VariableDeclarationList,  onVariable: (name: string, type: wasm.Type) => number): binaryen.Statement {
  const op = compiler.module;
  const initializers: binaryen.Expression[] = [];

  for (let i = 0, k = node.declarations.length; i < k; ++i) {
    const declaration = node.declarations[i];
    const declarationName = declaration.name.getText();
    if (declaration.type) {
      const declarationType = compiler.resolveType(declaration.type);

      setWasmType(declaration, declarationType);

      const index = onVariable(declarationName, declarationType);
      if (declaration.initializer)
        initializers.push(op.setLocal(index, compiler.maybeConvertValue(declaration.initializer, compiler.compileExpression(declaration.initializer, declarationType), getWasmType(declaration.initializer), declarationType, false)));
    } else {
      compiler.error(declaration, "Type expected");
    }
  }

  return initializers.length === 0 ? op.nop()
       : initializers.length === 1 ? initializers[0]
       : op.block("", initializers); // praise rule #1
}

export function compileVariable(compiler: Compiler, node: ts.VariableStatement, onVariable: (name: string, type: wasm.Type) => number): binaryen.Statement {
  return compileVariableDeclarationList(compiler, node.declarationList, onVariable);
}
