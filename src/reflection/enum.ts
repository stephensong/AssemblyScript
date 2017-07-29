/** @module assemblyscript/reflection */ /** */

import Compiler from "../compiler";
import Property from "./property";
import { intType } from "./type";
import * as typescript from "../typescript";

/** A reflected enum instance. */
export class Enum {

  /** Compiler reference. */
  compiler: Compiler;
  /** Global name. */
  name: string;
  /** Simple name. */
  simpleName: string;
  /** Declaration reference. */
  declaration: typescript.EnumDeclaration;
  /** Enum values by simple name. */
  values: { [key: string]: Property };

  /** Constructs a new reflected enum and binds it to its TypeScript declaration. */
  constructor(compiler: Compiler, name: string, declaration: typescript.EnumDeclaration) {
    this.compiler = compiler;
    this.name = name;
    this.declaration = declaration;
    this.simpleName = typescript.getTextOfNode(this.declaration.name);

    // register
    if (compiler.enums[this.name])
      throw Error("duplicate enum: " + name);
    compiler.enums[this.name] = this;

    // initialize
    this.values = {};

    for (const member of this.declaration.members) {
      const memberName = typescript.getTextOfNode(member.name);
      this.values[memberName] = new Property(this.compiler, memberName, member, intType, 0, /* for completeness: */ member.initializer);
    }
  }

  toString(): string { return this.name; }
}

export { Enum as default };
