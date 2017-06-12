import * as typescript from "../typescript";
import * as browsersys from "./browsersys";

export const defaultFormatDiagnosticsHost: typescript.FormatDiagnosticsHost = {
  getCurrentDirectory: () => typescript.sys.getCurrentDirectory(),
  getNewLine: () => typescript.sys.newLine,
  getCanonicalFileName: typescript.createGetCanonicalFileName(typescript.sys.useCaseSensitiveFileNames)
};

export function createDiagnosticForNodeEx(node: typescript.Node, category: typescript.DiagnosticCategory, message: string, arg1?: string) {
  let realMessage = message;
  if (arg1 != null)
    realMessage += ": " + arg1;
  return typescript.createDiagnosticForNode(node, {
    key: message.toLowerCase().replace(/\s+/g, "_").replace(/[^\w]/g, ""),
    category: category,
    code: <any>"-AS",
    message: realMessage
  });
}

export function printDiagnostic(diagnostic: typescript.Diagnostic): void {
  if (typescript.sys === browsersys) {
    if (diagnostic.category === typescript.DiagnosticCategory.Message)
      (console.info || console.log)(typescript.formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else if (diagnostic.category === typescript.DiagnosticCategory.Warning)
      (console.warn || console.log)(typescript.formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else
      (console.error || console.log)(typescript.formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
  } else {
    if (diagnostic.category === typescript.DiagnosticCategory.Message)
      process.stderr.write(typescript.formatDiagnostics([ diagnostic ], defaultFormatDiagnosticsHost));
    else
      process.stderr.write(typescript.formatDiagnosticsWithColorAndContext([ diagnostic ], defaultFormatDiagnosticsHost) + "\n");
  }
}
