abstract class ArrayImpl<T> extends Array<T> {
  abstract readonly length: uintptr;
  abstract dispose(): void;

  indexOf(value: T, startOffset: uintptr = 0): uintptr {
    const length: uintptr = this.length;
    while (startOffset < length) {
      if (this[startOffset] == value)
        return startOffset;
      ++startOffset;
    }
    return -1;
  }
}
