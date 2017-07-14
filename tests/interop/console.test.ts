import * as tape from "tape";
import { hexdump, IModule, arrayHeaderSize, LogType } from "../util";

export function test(test: tape.Test, module: IModule) {
  let logCount = 0;
  let infoCount = 0;
  let warnCount = 0;
  let errorCount = 0;
  let otherCount = 0;
  module.log = function customLog(type, message) {
    switch (type) {
      case LogType.LOG:
        ++logCount;
        test.strictEqual(message, "log message", "should call .log with 'log message'");
        break;
      case LogType.INFO:
        ++infoCount;
        test.strictEqual(message, "info message", "should call .info with 'info message'");
        break;
      case LogType.WARN:
        ++warnCount;
        test.strictEqual(message, "warn message", "should call .warn with 'warn message'");
        break;
      case LogType.ERROR:
        ++errorCount;
        test.strictEqual(message, "error message", "should call .error with 'error message'");
        break;
      default:
        ++otherCount;
        break;
    }
  }
  module.exports.test();
  test.strictEqual(logCount, 1, "should call .log exactly once");
  test.strictEqual(infoCount, 1, "should call .info exactly once");
  test.strictEqual(warnCount, 1, "should call .warn exactly once");
  test.strictEqual(errorCount, 1, "should call .error exactly once");
  test.strictEqual(otherCount, 0, "should not call anything else");
  test.end();
}
