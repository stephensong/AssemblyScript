import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import * as typescript from "../typescript";

export function compileVariable(compiler: Compiler, node: typescript.VariableStatement): binaryen.Statement {
  return compileVariableDeclarationList(compiler, node.declarationList);
}

export function compileVariableDeclarationList(compiler: Compiler, node: typescript.VariableDeclarationList): binaryen.Statement {
  const op = compiler.module;

  const initializers: binaryen.Expression[] = [];
  for (let i = 0, k = node.declarations.length; i < k; ++i) {
    const declaration = node.declarations[i];
    const declarationName = declaration.name.getText();
    if (declaration.type) {
      const declarationType = compiler.resolveType(declaration.type);

      typescript.setReflectedType(declaration, declarationType);

      const local = compiler.currentFunction.addLocal(declarationName, declarationType);
      if (declaration.initializer)
        initializers.push(op.setLocal(local.index, compiler.maybeConvertValue(declaration.initializer, compiler.compileExpression(declaration.initializer, declarationType), typescript.getReflectedType(declaration.initializer), declarationType, false)));
    } else
      compiler.error(declaration, "Type expected");
  }

  return initializers.length === 0 ? op.nop()
       : initializers.length === 1 ? initializers[0]
       : op.block("", initializers); // praise rule #1
}
