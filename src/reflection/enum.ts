import Compiler from "../compiler";
import { Property } from "./property";
import { intType } from "./type";
import * as typescript from "../typescript";

export class Enum {
  name: string;
  declaration: typescript.EnumDeclaration;
  properties: { [key: string]: Property };

  constructor(name: string, declaration: typescript.EnumDeclaration) {
    this.name = name;
    this.declaration = declaration;
  }

  initialize(compiler: Compiler): void {
    for (let i = 0, k = this.declaration.members.length; i < k; ++i) {
      const member = this.declaration.members[i];
      const name = typescript.getTextOfNode(member.name);
      this.properties[name] = new Property(name, member, intType, 0, <number>compiler.checker.getConstantValue(member));
    }
  }

  toString(): string { return this.name; }
}

export { Enum as default };
