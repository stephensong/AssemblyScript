/** @module assemblyscript/reflection */ /** */

import Compiler from "../compiler";
import Type from "./type";
import * as typescript from "../typescript";
import * as util from "../util";

/** A reflected property. Also used to describe enum values. */
export class Property {

  /** Compiler reference. */
  compiler: Compiler;
  /** Global name. */
  name: string;
  /** Simple name. */
  simpleName: string;
  /** Declaration reference. */
  declaration: typescript.PropertyDeclaration | typescript.EnumMember;
  /** Resolved type. */
  type: Type;
  /** Offset in memory, if applicable. */
  offset: number;
  /** Initializer expression, if applicable. */
  initializer: typescript.Expression | undefined;

  /** Constructs a new reflected property. */
  constructor(compiler: Compiler, name: string, declaration: typescript.PropertyDeclaration | typescript.EnumMember, type: Type, offset: number, initializer?: typescript.Expression) {
    this.compiler = compiler;
    this.name = name;
    this.declaration = declaration;
    this.simpleName = typescript.getTextOfNode(this.declaration.name);
    this.type = type;
    this.offset = offset;
    this.initializer = initializer;
  }

  /** Tests if this property is an instance member. */
  get isInstance(): boolean { return this.declaration.kind !== typescript.SyntaxKind.EnumMember && !util.isStatic(this.declaration); }

  toString(): string { return this.name; }
}

export { Property as default };
