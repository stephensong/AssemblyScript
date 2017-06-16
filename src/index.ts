import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import Compiler from "./compiler";
import * as expressions from "./expressions";
import * as library from "./library";
import * as loader from "../lib/loader/build";
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
  loader,
  Profiler,
  reflection,
  statements,
  typescript,
  version: library.version
};

export = assemblyscript;

(<any>global).assemblyscript = assemblyscript;
