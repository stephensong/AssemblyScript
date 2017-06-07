import * as binaryen from "../../binaryen";
import Compiler from "../../compiler";
import * as reflection from "../../reflection";
import * as typescript from "../../typescript";

export function compileStore(compiler: Compiler, node: typescript.Node, type: reflection.Type, ptr: binaryen.Expression, value: binaryen.Expression, offset: number): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, type);

  switch (type) {

    case reflection.byteType:
    case reflection.sbyteType:
      return op.i32.store8(offset, type.size, ptr, value);

    case reflection.shortType:
    case reflection.ushortType:
      return op.i32.store16(offset, type.size, ptr, value);

    case reflection.intType:
    case reflection.uintType:
    case reflection.boolType:
    case reflection.uintptrType32:
      return op.i32.store(offset, type.size, ptr, value);

    case reflection.longType:
    case reflection.ulongType:
    case reflection.uintptrType64:
      return op.i64.store(offset, type.size, ptr, value);

  }
  throw Error("unexpected type");
}

export { compileStore as default };
