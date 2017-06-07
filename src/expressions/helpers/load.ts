import * as binaryen from "../../binaryen";
import Compiler from "../../compiler";
import * as reflection from "../../reflection";
import * as typescript from "../../typescript";

export function compileLoad(compiler: Compiler, node: typescript.Node, type: reflection.Type, ptr: binaryen.Expression, offset: number): binaryen.Expression {
  const op = compiler.module;

  typescript.setReflectedType(node, type);

  switch (type) {

    case reflection.byteType:
      return op.i32.load8_u(offset, type.size, ptr);

    case reflection.sbyteType:
      return op.i32.load8_s(offset, type.size, ptr);

    case reflection.shortType:
      return op.i32.load16_s(offset, type.size, ptr);

    case reflection.ushortType:
      return op.i32.load16_u(offset, type.size, ptr);

    case reflection.intType:
    case reflection.uintType:
    case reflection.boolType:
    case reflection.uintptrType32:
      return op.i32.load(offset, type.size, ptr);

    case reflection.longType:
    case reflection.ulongType:
    case reflection.uintptrType64:
      return op.i64.load(offset, type.size, ptr);

  }
  throw Error("unexpected type");
}

export { compileLoad as default };
