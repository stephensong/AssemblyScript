Distributions
=============

This folder contains pre-built browser binaries of AssemblyScript.

Note that Binaryen is not included in the bundle. A compatible version of Binaryen can be obtained from [lib/binaryen](../lib/binaryen).

Usage
-----

Local:

```html
<script src="binaryen.js"></script>
<script src="assemblyscript.min.js"></script>
```

CDN:

```html
<script src="//rawgit.com/dcodeIO/AssemblyScript/master/lib/binaryen/index.js"></script>
<script src="//rawgit.com/dcodeIO/AssemblyScript/master/dist/assemblyscript.min.js"></script>
```

Remember to replace `master` with the exact version / tag your application depends upon, if applicable.

```js
const Compiler = assemblyscript.Compiler;

const module = Compiler.compileString(`
export function add(a: int, b: int): int {
  return a + b;
}
`, { silent: true });

if (module) {
  const text = module.emitText();
  const wasm = module.emitBinary();
  ...
} else
  throw Error("compilation failed"); // or inspect Compiler.lastDiagnostics
...
```
