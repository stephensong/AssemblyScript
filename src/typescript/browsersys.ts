import * as typescript from "../typescript";

const sys: typescript.System = {
  args: [],
  newLine: "\n",
  useCaseSensitiveFileNames: true,
  write(s: string) {
    // tslint:disable-next-line
    console.log(s);
  },
  getCurrentDirectory(): string {
    return ".";
  },
  getDirectories(): string[] {
    return [ "." ];
  },
  fileExists(path: string): boolean {
    return false;
  },
  directoryExists(path: string): boolean {
    return path === ".";
  },
  readFile(path: string, encoding?: string): string {
    throw Error("not supported");
  },
  writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
    throw Error("not supported");
  },
  resolvePath(path: string): string {
    throw Error("not supported");
  },
  createDirectory(path: string): void {
    throw Error("not supported");
  },
  getExecutingFilePath(): string {
    throw Error("not supported");
  },
  readDirectory(path: string, extensions?: string[], exclude?: string[], include?: string[]): string[] {
    throw Error("not supported");
  },
  exit(exitCode?: number): void {
    throw Error("not supported");
  },
  getEnvironmentVariable(name: string): string {
    throw Error("not supported");
  }
};

export = sys;
