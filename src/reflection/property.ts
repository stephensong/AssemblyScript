import { Type } from "./type";
import * as typescript from "../typescript";

export class Property {
  name: string;
  declaration: typescript.PropertyDeclaration | typescript.EnumMember;
  type: Type;
  offset: number;
  constantValue?: any;

  constructor(name: string, declaration: typescript.PropertyDeclaration | typescript.EnumMember, type: Type, offset: number, constantValue?: any) {
    this.name = name;
    this.declaration = declaration;
    this.type = type;
    this.offset = offset;
    this.constantValue = constantValue;
  }

  get isConstant(): boolean { return this.constantValue !== undefined;}
  get isInstance(): boolean { return this.declaration.kind !== typescript.SyntaxKind.EnumMember && !typescript.isStatic(this.declaration); }
}

export { Property as default };
