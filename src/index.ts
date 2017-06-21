/**
 * The exported AssemblyScript namespace.
 *
 * <h4>Sub-namespaces</h4>
 * <ul style="margin: 0; padding: 0; list-style: none">
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/binaryen|binaryen}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/builtins|builtins}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/expressions|expressions}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/library|library}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/loader|loader}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/reflection|reflection}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/statements|statements}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/typescript|typescript}</li>
 *   <li class="tsd-kind-module"><span class="tsd-kind-icon" /> {@link assemblyscript/wabt|wabt}</li>
 * </ul>
 *
 * @module assemblyscript
 * @preferred
 */ /** */

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

/** AssemblyScript version. */
export const version = library.version;

export {
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
  wabt
};

(<any>global).assemblyscript = {
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
  version,
  wabt
};
