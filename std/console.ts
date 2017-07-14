enum LogType {
  Log = 0,
  Info = 1,
  Warn = 2,
  Error = 3
}

declare function log(type: int, message: string): void;

export class console {

  static log(message: string): void {
    log(LogType.Log, message);
  }

  static info(message: string): void {
    log(LogType.Info, message);
  }

  static warn(message: string): void {
    log(LogType.Warn, message);
  }

  static error(message: string): void {
    log(LogType.Error, message);
  }
}