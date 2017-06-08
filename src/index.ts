/*!
 * AssemblyScript (c) 2017, Daniel Wirtz
 * Licensed under the Apache-License, Version 2.0
 * see: https://github.com/dcodeIO/AssemblyScript for details
 */

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

/** The exported AssemblyScript namespace. */
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
