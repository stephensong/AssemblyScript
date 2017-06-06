/// <reference path="../lib/require-json.d.ts" />

import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import Compiler from "./compiler";
import * as expressions from "./expressions";
import * as library from "./library";
import * as pkg from "../package.json";
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
  pkg,
  Profiler,
  reflection,
  statements,
  typescript,
  version: (<any>pkg).version
};

export = assemblyscript;

// Fix dependencies automatically being exposed globally
delete (<any>global).Binaryen;
delete (<any>global).ts;
