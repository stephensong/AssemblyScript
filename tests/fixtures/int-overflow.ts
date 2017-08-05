//! { "noRuntime": true }

export function testSbyte(): sbyte {
  return -1 + 1;
}

export function testByte(): byte {
  return 255 + 1;
}

export function testShort(): short {
  return -1 + 1;
}

export function testUshort(): ushort {
  return 65535 + 1;
}

export function testInt(): int {
  return -1 + 1;
}

export function testUint(): uint {
  return 4294967295 + 1;
}

export function testLong(): long {
  return -1 + 1;
}

export function testUlong(): ulong {
  return 18446744073709551615 + 1;
}
