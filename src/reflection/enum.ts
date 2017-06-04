import { Property } from "./property";

export class Enum {
  name: string;
  properties: { [key: string]: Property };

  constructor(name: string) {
    this.name = name;
    this.properties = {};
  }
}
