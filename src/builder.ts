import { binaryen } from "./wasm";

export class Builder {
  module: binaryen.Module;
  body: binaryen.Statement[] = [];

  constructor(module: binaryen.Module) {
    this.module = module;
  }

  append(statement: binaryen.Statement): Builder {
    if (statement)
      this.body.push(statement);
    return this;
  }

  appendAll(statements: binaryen.Statement[]): Builder {
    for (let i = 0, k = statements.length; i < k; ++i)
      if (statements[i])
        this.body.push(statements[i]);
    return this;
  }

  finish(name?: string, isLoop?: boolean): binaryen.Statement {
    if (!name) {
      if (this.body.length === 0)
        return this.module.nop();
      if (this.body.length === 1)
        return this.body[0];
    }
    return isLoop
      ? this.module.loop(name || "", this.body)
      : this.module.block(name || "", this.body);
  }
}
