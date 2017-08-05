//! { "noRuntime": true }

class SomeClass<T> {
  instanceMethod<V>(a: V): V {
    return a;
  };
  static staticMethod<V>(a: V): V {
    return a;
  };
}

export function test(a: SomeClass<int>, b: SomeClass<long>): void {
  a.instanceMethod<float>(0.25);
  b.instanceMethod<double>(0.5);
  SomeClass.staticMethod<float>(0.75);
  SomeClass.staticMethod<double>(1.0);
}
