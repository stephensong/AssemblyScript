/** @module assemblyscript/expressions */ /** */

import * as binaryen from "binaryen";
import * as builtins from "../builtins";
import Compiler from "../compiler";
import * as reflection from "../reflection";
import * as typescript from "../typescript";
import * as util from "../util";

/** Compiles a function call expression. */
export function compileCall(compiler: Compiler, node: typescript.CallExpression/*, contextualType: reflection.Type*/): binaryen.Expression {
  const op = compiler.module;

  // we'll need a reference to the reflected function and, if it is an instance call, evaluate the value of 'this'
  let instance: reflection.Function | undefined;
  let template: reflection.FunctionTemplate | undefined;
  let thisExpression: binaryen.Expression | undefined;

  // either static (Classname.methodName) or instance (expression.methodName)
  if (node.expression.kind === typescript.SyntaxKind.PropertyAccessExpression) {
    const accessNode = <typescript.PropertyAccessExpression>node.expression;
    const methodName = typescript.getTextOfNode(accessNode.name);

    // check for Classname.methodName
    if (accessNode.expression.kind === typescript.SyntaxKind.Identifier) {
      const reference = compiler.resolveReference(<typescript.Identifier>accessNode.expression, reflection.ObjectFlags.ClassTemplate);
      if (reference instanceof reflection.ClassTemplate) {
        const methodDeclaration = reference.methodDeclarations[methodName];
        if (methodDeclaration) {
          const method = compiler.initializeStaticMethod(methodDeclaration);
          instance = method.instance;
          template = method.template;
        } else {
          compiler.report(accessNode.name, typescript.DiagnosticsEx.Unresolvable_identifier_0, methodName);
          return op.unreachable();
        }
      } // otherwise try next
    }

    // otherwise expression.methodName
    if (!template) {
      thisExpression = compiler.compileExpression(accessNode.expression, compiler.uintptrType);
      const thisType = util.getReflectedType(accessNode.expression);
      const underlyingClass = thisType.underlyingClass;

      if (!underlyingClass)
        throw Error("expected a class type"); // handled by typescript

      instance = underlyingClass.methods[methodName].instance;
      template = underlyingClass.methods[methodName].template;
    }

  // super call
  } else if (node.expression.kind === typescript.SyntaxKind.SuperKeyword) {
    const thisClass = compiler.currentFunction.parent;

    if (!(thisClass && thisClass.base))
      throw Error("missing base class"); // handled by typescript

    let baseClass: reflection.Class | undefined = thisClass.base;
    let ctor: reflection.Function | undefined;
    while (baseClass) {
      ctor = baseClass.ctor;
      if (ctor && ctor.body)
        break;
      baseClass = baseClass.base;
    }

    if (!(ctor && ctor.body))
      return op.nop(); // no explicit parent constructor

    instance = ctor;
    template = ctor.template;
    thisExpression = op.getLocal(compiler.currentFunction.localsByName.this.index, compiler.typeOf(compiler.uintptrType));

  // top-level function call
  } else if (node.expression.kind === typescript.SyntaxKind.Identifier) {
    const reference = <reflection.Function | reflection.FunctionTemplate>compiler.resolveReference(<typescript.Identifier>node.expression, reflection.ObjectFlags.FunctionInclTemplate);

    if (reference instanceof reflection.Function) {
      instance = reference;
      template = reference.template;

    } else if (reference instanceof reflection.FunctionTemplate) {
      template = reference;

    } else {
      compiler.report(node.expression, typescript.DiagnosticsEx.Unresolvable_identifier_0, typescript.getTextOfNode(node.expression));
      return op.unreachable();
    }

  } else {
    compiler.report(node.expression, typescript.DiagnosticsEx.Unsupported_node_kind_0_in_1, node.expression.kind, "expressions.compileCall");
    return op.unreachable();
  }

  // at this point, template is known but instance might not
  if (!instance) {
    const typeArgumentsMap: reflection.TypeArgumentsMap = {};

    // inherit type arguments from current class and function
    const currentFunction = compiler.currentFunction;
    if (currentFunction) {
      if (currentFunction.parent)
        Object.keys(currentFunction.parent.typeArgumentsMap).forEach(key => typeArgumentsMap[key] = (<reflection.Class>currentFunction.parent).typeArgumentsMap[key]);
      Object.keys(currentFunction.typeArgumentsMap).forEach(key => typeArgumentsMap[key] = currentFunction.typeArgumentsMap[key]);
    }

    // but always prefer bound parent arguments, if applicable
    if (template.parent)
      Object.keys(template.parent.typeArgumentsMap).forEach(key => typeArgumentsMap[key] = (<reflection.Class>(<reflection.FunctionTemplate>template).parent).typeArgumentsMap[key]);

    instance = template.resolve(node.typeArguments || [], typeArgumentsMap); // reports
  }

  util.setReflectedType(node, instance.returnType);

  // compile built-in call to inline assembly
  if (builtins.isBuiltin(instance.name, true)) {

    const argumentExpressions: binaryen.Expression[] = new Array(instance.parameters.length);
    for (let i = 0, k = instance.parameters.length; i < k; ++i) {
      const argumentType = instance.parameters[i].type;
      argumentExpressions[i] = compiler.compileExpression(node.arguments[i], argumentType, argumentType, false);
    }

    switch (instance.simpleName) {

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

      case "unreachable":
        return builtins.unreachable(compiler);

      case "sizeof":
        return builtins.sizeof(compiler, instance.typeArgumentsMap.T.type);

      case "unsafe_cast":
        return builtins.unsafe_cast(argumentExpressions[0]);

      case "isNaN":
      case "isNaNf":
        return builtins.isNaN(compiler, node.arguments[0], argumentExpressions[0]);

      case "isFinite":
      case "isFinitef":
        return builtins.isFinite(compiler, node.arguments[0], argumentExpressions[0]);
    }
  }

  // otherwise call the actual function (compiles it if necessary)
  return instance.compileCall(node.arguments, thisExpression);
}

export { compileCall as default };
