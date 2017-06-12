/*!
 * AssemblyScript (c) 2017, Daniel Wirtz
 * Licensed under the Apache-License, Version 2.0
 * see: https://github.com/dcodeIO/AssemblyScript for details
 */

import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import Compiler from "./compiler";
import * as expressions from "./expressions";
import * as library from "./library";
import Profiler from "./profiler";
import * as reflection from "./reflection";
import * as typescript from "./typescript";
import * as statements from "./statements";

/** The exported AssemblyScript namespace. */
const assemblyscript = {
  binaryen,
  builtins,
  Compiler,
  expressions,
  library,
  Profiler,
  reflection,
  statements,
  typescript,
  version: library.version
};

export = assemblyscript;

(<any>global).assemblyscript = assemblyscript;
