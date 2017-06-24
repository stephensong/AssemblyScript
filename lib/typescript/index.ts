// Support '.as'  files
const getScriptKindFromFileName_original = ts.getScriptKindFromFileName;
ts.getScriptKindFromFileName = function getScriptKindFromFileNameEx(fileName) {
  const ext = fileName.substr(fileName.lastIndexOf("."));
  if (ext.toLowerCase() === ".as")
    return ts.ScriptKind.TS;
  return getScriptKindFromFileName_original(fileName);
};
ts.supportedTypeScriptExtensions.unshift(".as");
ts.supportedTypescriptExtensionsForExtractExtension.push(".as");

// Polyfill 'sys' in browsers
if (!ts.sys) {
  ts.sys = <ts.System>{
    args: [],
    newLine: "\n",
    useCaseSensitiveFileNames: true,
    write(s: string) { // tslint:disable-next-line
      console.log(s.replace(/\r?\n$/, ""));
    },
    getCurrentDirectory(): string {
      return ".";
    },
    getDirectories(): string[] {
      return [ "." ];
    },
    fileExists(/* path: string */): boolean {
      return false;
    },
    directoryExists(path: string): boolean {
      return path === ".";
    },
    readFile(/* path: string, encoding?: string */): string {
      throw Error("not implemented");
    },
    writeFile(/* path: string, data: string, writeByteOrderMark?: boolean */): void {
      throw Error("not implemented");
    },
    resolvePath(/* path: string */): string {
      throw Error("not implemented");
    },
    createDirectory(/* path: string */): void {
      throw Error("not implemented");
    },
    getExecutingFilePath(): string {
      throw Error("not implemented");
    },
    readDirectory(/* path: string, extensions?: string[], exclude?: string[], include?: string[] */): string[] {
      throw Error("not implemented");
    },
    exit(/* exitCode?: number */): void {
      throw Error("not implemented");
    },
    getEnvironmentVariable(/* name: string */): string {
      throw Error("not implemented");
    }
  };
}

module.exports = ts;
