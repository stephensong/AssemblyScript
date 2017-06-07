import now = require("performance-now");

export class Profiler {
  startTimes: { [key: string]: number } = {};

  start(name: string): void {
    this.startTimes[name] = now();
  }

  end(name: string): number {
    const start = this.startTimes[name];
    if (!start)
      return 0;
    return now() - start;
  }
}

export { Profiler as default };
