import * as binaryen from "./binaryen";
import * as builtins from "./builtins";
import Compiler from "./compiler";
import * as expressions from "./expressions";
import * as library from "./library";
import * as loader from "../lib/loader";
import Profiler from "./profiler";
import * as reflection from "./reflection";
import * as typescript from "./typescript";
import * as statements from "./statements";
import * as wabt from "./wabt";

/** AssemblyScript namespace. */
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
  version: library.version,
  wabt
};

export = assemblyscript;

(<any>global).assemblyscript = assemblyscript;
