import "./typescript/src/compiler/core";
import "./typescript/src/compiler/performance";
import "./typescript/src/compiler/sys";
import "./typescript/src/compiler/types";
import "./typescript/src/compiler/scanner";
import "./typescript/src/compiler/parser";
import "./typescript/src/compiler/utilities";
import "./typescript/src/compiler/binder";
import "./typescript/src/compiler/checker";
import "./typescript/src/compiler/factory";
import "./typescript/src/compiler/visitor";
import "./typescript/src/compiler/comments";
import "./typescript/src/compiler/program";
import "./typescript/src/compiler/diagnosticInformationMap.generated";

// Just a poc, for now
export const Diagnostics = ts.Diagnostics;

if (typeof global !== "undefined" && global)
  delete (<any>global).ts;
if (typeof window !== "undefined" && window)
  delete (<any>window).ts;
