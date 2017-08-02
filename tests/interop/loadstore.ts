//! { "memoryModel": "bare" }

export function doload(offset: uintptr): int {
  return load<int>(offset);
}

export function dostore(offset: uintptr, value: int): void {
  store<int>(offset, value);
}
