import * as binaryen from "../binaryen";
import { Compiler } from "../compiler";
import { isImport, binaryenTypeOf, getWasmType, setWasmType } from "../util";
import * as wasm from "../wasm";

import * as builtins from "../builtins";

export function compileCall(compiler: Compiler, node: ts.CallExpression, contextualType: wasm.Type): binaryen.Expression {
  const op = compiler.module;
  const signature = compiler.checker.getResolvedSignature(node);
  if (!signature) {
    compiler.error(node, "Unresolvable call target");
    return op.unreachable();
  }

  const declaration = signature.declaration;
  const wasmFunction = <wasm.Function>(<any>declaration).wasmFunction; // TODO: that doesn't seem correct
  if (wasmFunction === null)
    throw Error("it isn't correct");

  if (!wasmFunction) {
    compiler.error(node, "Unresolvable call target");
    setWasmType(node, contextualType);
    return op.unreachable();
  }

  const argumentExpressions: binaryen.Expression[] = new Array(wasmFunction.parameterTypes.length);

  setWasmType(node, wasmFunction.returnType);

  let i = 0;

  if ((wasmFunction.flags & wasm.FunctionFlags.instance) !== 0)
    argumentExpressions[i++] = op.getLocal(0, binaryenTypeOf(wasmFunction.parameterTypes[0], compiler.uintptrSize));

  for (const k = argumentExpressions.length; i < k; ++i)
    argumentExpressions[i] = compiler.maybeConvertValue(node.arguments[i], compiler.compileExpression(node.arguments[i], wasmFunction.parameterTypes[i]), getWasmType(node.arguments[i]), wasmFunction.parameterTypes[i], false);

  if (i < argumentExpressions.length) { // TODO: pull default value initializers from declaration
    compiler.error(node, "Invalid number of arguments", "Expected " + declaration.parameters.length + " but saw " + node.arguments.length);
    return op.unreachable();
  }

  let typeArguments: wasm.Type[] = [];

  if (declaration.typeParameters) {
    if (!node.typeArguments || node.typeArguments.length !== declaration.typeParameters.length) {
      compiler.error(node, "Invalid number of type arguments");
      return op.unreachable();
    }
    i = 0;
    typeArguments = new Array(node.typeArguments.length);
    for (const k = declaration.typeParameters.length; i < k; ++i) {
      const resolvedType = compiler.resolveType(node.typeArguments[i]);
      if (!resolvedType) {
        compiler.error(node.typeArguments[i], "Unresolvable type");
        return op.unreachable();
      }
      // TODO: check if type is valid
      typeArguments[i] = resolvedType;
    }
  }

  // user function
  if (!isImport(declaration))
    return op.call(wasmFunction.name, argumentExpressions, binaryenTypeOf(wasmFunction.returnType, compiler.uintptrSize));

  // builtin
  switch ((<ts.Symbol>declaration.symbol).name) {

    case "rotl":
    case "rotll":
      return builtins.rotl(compiler, [ node.arguments[0], node.arguments[1] ], [ argumentExpressions[0], argumentExpressions[1] ]);

    case "rotr":
    case "rotrl":
      return builtins.rotr(compiler, [ node.arguments[0], node.arguments[1] ], [ argumentExpressions[0], argumentExpressions[1] ]);

    case "clz":
    case "clzl":
      return builtins.clz(compiler, node.arguments[0], argumentExpressions[0]);

    case "ctz":
    case "ctzl":
      return builtins.ctz(compiler, node.arguments[0], argumentExpressions[0]);

    case "popcnt":
    case "popcntl":
      return builtins.popcnt(compiler, node.arguments[0], argumentExpressions[0]);

    case "abs":
    case "absf":
      return builtins.abs(compiler, node.arguments[0], argumentExpressions[0]);

    case "ceil":
    case "ceilf":
      return builtins.ceil(compiler, node.arguments[0], argumentExpressions[0]);

    case "floor":
    case "floorf":
      return builtins.floor(compiler, node.arguments[0], argumentExpressions[0]);

    case "sqrt":
    case "sqrtf":
      return builtins.sqrt(compiler, node.arguments[0], argumentExpressions[0]);

    case "trunc":
    case "truncf":
      return builtins.trunc(compiler, node.arguments[0], argumentExpressions[0]);

    case "nearest":
    case "nearestf":
      return builtins.nearest(compiler, node.arguments[0], argumentExpressions[0]);

    case "min":
    case "minf":
      return builtins.min(compiler, [ node.arguments[0], node.arguments[1] ], [ argumentExpressions[0], argumentExpressions[1] ]);

    case "max":
    case "maxf":
      return builtins.max(compiler, [ node.arguments[0], node.arguments[1] ], [ argumentExpressions[0], argumentExpressions[1] ]);

    case "copysign":
    case "copysignf":
      return builtins.copysign(compiler, [ node.arguments[0], node.arguments[1] ], [ argumentExpressions[0], argumentExpressions[1] ]);

    case "reinterpreti":
    case "reinterpretl":
    case "reinterpretf":
    case "reinterpretd":
      return builtins.reinterpret(compiler, node.arguments[0], argumentExpressions[0]);

    case "current_memory":
      return builtins.current_memory(compiler);

    case "grow_memory":
      return builtins.grow_memory(compiler, node.arguments[0], argumentExpressions[0]);

    case "sizeof":
      return builtins.sizeof(compiler, typeArguments[0]);
  }

  // import
  return op.call(wasmFunction.name, argumentExpressions, binaryenTypeOf(wasmFunction.returnType, compiler.uintptrSize));
}
