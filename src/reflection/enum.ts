import { Property } from "./property";
import * as typescript from "../typescript";

export class Enum {
  name: string;
  declaration: typescript.EnumDeclaration;
  properties: { [key: string]: Property };

  constructor(name: string, declaration: typescript.EnumDeclaration) {
    this.name = name;
    this.declaration = declaration;
  }
}

export { Enum as default };
