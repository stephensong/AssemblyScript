import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import Compiler from "./compiler";
import * as expressions from "./expressions";
import * as library from "./library";
import Profiler from "./profiler";
import * as reflection from "./reflection";
import * as typescript from "./typescript";
import * as statements from "./statements";

const assemblyscript = {
  binaryen,
  builtins,
  Compiler,
  expressions,
  library,
  Profiler,
  reflection,
  statements,
  typescript
};

export = assemblyscript;

// Fix dependencies exposing themself globally
delete (<any>global).Binaryen;
delete (<any>global).ts;
