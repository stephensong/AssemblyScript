import now = require("performance-now");

/** A simple profiler used to measure compilation times. */
export class Profiler {

  /** Cached labels. */
  labels: { [key: string]: number } = {};

  /**
   * Starts measuring using the specified label.
   * @param label Label
   */
  start(label: string): void {
    this.labels[label] = now();
  }

  /**
   * Ends measuring using the specified label.
   * @param label Label
   * @returns High resolution time span in milliseconds
   */
  end(label: string): number {
    const start = this.labels[label];
    if (!start)
      return 0;
    return now() - start;
  }
}

export { Profiler as default };
