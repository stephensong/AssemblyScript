export abstract class Array<T> implements IDisposable {
  readonly length: int;

  indexOf(value: T, startOffset: int = 0): int {
    const length: int = this.length;
    while (startOffset < length) {
      if (this[startOffset] == value)
        return startOffset;
      ++startOffset;
    }
    return -1;
  }

  abstract dispose(): void;
}
