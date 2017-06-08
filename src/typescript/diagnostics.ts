import * as typescript from "../typescript";

const redForegroundEscapeSequence = "\u001b[91m";
const yellowForegroundEscapeSequence = "\u001b[93m";
const blueForegroundEscapeSequence = "\u001b[93m";
const gutterStyleSequence = "\u001b[100;30m";
const gutterSeparator = " ";
const resetEscapeSequence = "\u001b[0m";
const ellipsis = "...";

function getCategoryFormat(category: typescript.DiagnosticCategory): string {
  switch (category) {
    case typescript.DiagnosticCategory.Warning: return yellowForegroundEscapeSequence;
    case typescript.DiagnosticCategory.Error: return redForegroundEscapeSequence;
    case typescript.DiagnosticCategory.Message: return blueForegroundEscapeSequence;
  }
}

function formatAndReset(text: string, formatStyle: string) {
  return formatStyle + text + resetEscapeSequence;
}

function padLeft(s: string, length: number) {
  while (s.length < length) {
    s = " " + s;
  }
  return s;
}

export const defaultFormatDiagnosticsHost: typescript.FormatDiagnosticsHost = {
  getCurrentDirectory: () => typescript.sys.getCurrentDirectory(),
  getNewLine: () => typescript.sys.newLine,
  getCanonicalFileName: typescript.createGetCanonicalFileName(typescript.sys.useCaseSensitiveFileNames)
};

export function formatDiagnostics(diagnostics: typescript.Diagnostic[], host: typescript.FormatDiagnosticsHost = defaultFormatDiagnosticsHost): string {
  let output = "";

  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      const { line, character } = typescript.getLineAndCharacterOfPosition(diagnostic.file, <number>diagnostic.start);
      const fileName = diagnostic.file.fileName;
      const relativeFileName = typescript.convertToRelativePath(fileName, host.getCurrentDirectory(), relFileName => host.getCanonicalFileName(relFileName));
      output += `${relativeFileName}(${line + 1},${character + 1}): `;
    }

    const category = typescript.DiagnosticCategory[diagnostic.category].toLowerCase();
    output += `${category} TS${diagnostic.code}: ${typescript.flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine())}${host.getNewLine()}`;
  }
  return output;
}

export function formatDiagnosticsWithColorAndContext(diagnostics: typescript.Diagnostic[], host: typescript.FormatDiagnosticsHost = defaultFormatDiagnosticsHost): string {
  let output = "";
  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      const start = <number>diagnostic.start;
      const length = <number>diagnostic.length;
      const file = <typescript.SourceFile>diagnostic.file;
      const { line: firstLine, character: firstLineChar } = typescript.getLineAndCharacterOfPosition(file, start);
      const { line: lastLine, character: lastLineChar } = typescript.getLineAndCharacterOfPosition(file, start + length);
      const lastLineInFile = typescript.getLineAndCharacterOfPosition(file, file.text.length).line;
      const relativeFileName = host ? typescript.convertToRelativePath(file.fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName)) : file.fileName;

      const hasMoreThanFiveLines = (lastLine - firstLine) >= 4;
      let gutterWidth = (lastLine + 1 + "").length;
      if (hasMoreThanFiveLines) {
        gutterWidth = Math.max(ellipsis.length, gutterWidth);
      }

      output += typescript.sys.newLine;
      for (let i = firstLine; i <= lastLine; i++) {
        // If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
        // so we'll skip ahead to the second-to-last line.
        if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
          output += formatAndReset(padLeft(ellipsis, gutterWidth), gutterStyleSequence) + gutterSeparator + typescript.sys.newLine;
          i = lastLine - 1;
        }

        const lineStart = typescript.getPositionOfLineAndCharacter(file, i, 0);
        const lineEnd = i < lastLineInFile ? typescript.getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
        let lineContent = file.text.slice(lineStart, lineEnd);
        lineContent = lineContent.replace(/\s+$/g, "");  // trim from end
        lineContent = lineContent.replace("\t", " ");    // convert tabs to single spaces

        // Output the gutter and the actual contents of the line.
        output += formatAndReset(padLeft(i + 1 + "", gutterWidth), gutterStyleSequence) + gutterSeparator;
        output += lineContent + typescript.sys.newLine;

        // Output the gutter and the error span for the line using tildes.
        output += formatAndReset(padLeft("", gutterWidth), gutterStyleSequence) + gutterSeparator;
        output += redForegroundEscapeSequence;
        if (i === firstLine) {
          // If we're on the last line, then limit it to the last character of the last line.
          // Otherwise, we'll just squiggle the rest of the line, giving 'slice' no end position.
          const lastCharForLine = i === lastLine ? lastLineChar : undefined;

          output += lineContent.slice(0, firstLineChar).replace(/\S/g, " ");
          output += lineContent.slice(firstLineChar, lastCharForLine).replace(/./g, "~");

        } else if (i === lastLine) {
          output += lineContent.slice(0, lastLineChar).replace(/./g, "~");

        } else {
          // Squiggle the entire line.
          output += lineContent.replace(/./g, "~");
        }
        output += resetEscapeSequence;

        output += typescript.sys.newLine;
      }

      output += typescript.sys.newLine;
      output += `${relativeFileName}(${firstLine + 1},${firstLineChar + 1}): `;
    }

    const categoryColor = getCategoryFormat(diagnostic.category);
    const category = typescript.DiagnosticCategory[diagnostic.category].toLowerCase();
    output += `${formatAndReset(category, categoryColor)} TS${diagnostic.code}: ${typescript.flattenDiagnosticMessageText(diagnostic.messageText, typescript.sys.newLine)}`;
  }
  return output;
}

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

import * as browsersys from "./browsersys";

export function printDiagnostic(diagnostic: typescript.Diagnostic): void {
  if (typescript.sys === browsersys) {
    if (diagnostic.category === typescript.DiagnosticCategory.Message)
      (console.info || console.log)(formatDiagnostics([ diagnostic ]));
    else if (diagnostic.category === typescript.DiagnosticCategory.Warning)
      (console.warn || console.log)(formatDiagnostics([ diagnostic ]));
    else
      (console.error || console.log)(formatDiagnostics([ diagnostic ]));
  } else {
    if (diagnostic.category === typescript.DiagnosticCategory.Message)
      process.stderr.write(formatDiagnostics([ diagnostic ]));
    else
      process.stderr.write(formatDiagnosticsWithColorAndContext([ diagnostic ]) + "\n");
  }
}
