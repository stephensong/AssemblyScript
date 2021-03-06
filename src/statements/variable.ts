/** @module assemblyscript/statements */ /** */

import * as binaryen from "binaryen";
import { Compiler } from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";

/** Compiles a variable declaration statement. */
export function compileVariable(compiler: Compiler, node: typescript.VariableStatement): binaryen.Statement {
  return compileVariableDeclarationList(compiler, node.declarationList);
}

export { compileVariable as default };

/** Compiles a variable declaration list statement. */
export function compileVariableDeclarationList(compiler: Compiler, node: typescript.VariableDeclarationList): binaryen.Statement {
  const op = compiler.module;

  const initializers: binaryen.Expression[] = [];
  let lastType: reflection.Type | undefined;
  for (let i = 0, k = node.declarations.length; i < k; ++i) {
    const declaration = node.declarations[i];
    const declarationName = typescript.getTextOfNode(declaration.name);
    let declarationType: reflection.Type;
    if (declaration.type) {
      const declarationTypeName = typescript.getTextOfNode(declaration.type);
      lastType = declarationType = compiler.currentFunction && compiler.currentFunction.typeArgumentsMap[declarationTypeName] && compiler.currentFunction.typeArgumentsMap[declarationTypeName].type || compiler.resolveType(declaration.type);
      if (!declarationType)
        declarationType = reflection.voidType;
    } else if (lastType) {
      compiler.report(declaration.name, typescript.DiagnosticsEx.Assuming_variable_type_0, lastType.toString());
      declarationType = lastType;
    } else {
      compiler.report(declaration.name, typescript.DiagnosticsEx.Type_expected);
      continue;
    }
    const local = compiler.currentFunction.addLocal(declarationName, declarationType);
    if (declaration.initializer)
      initializers.push(op.setLocal(local.index, compiler.compileExpression(declaration.initializer, declarationType, declarationType, false)));
  }

  return initializers.length === 0 ? op.nop()
       : initializers.length === 1 ? initializers[0]
       : op.block("", initializers); // binaryen -O unwraps this
}
