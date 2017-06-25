export abstract class Array<T> implements IDisposable {
  readonly length: uintptr;

  indexOf(value: T, startOffset: uintptr = 0): uintptr {
    const length: uintptr = this.length;
    while (startOffset < length) {
      if (this[startOffset] == value)
        return startOffset;
      ++startOffset;
    }
    return -1;
  }

  abstract dispose(): void;
}
