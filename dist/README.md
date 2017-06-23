Distributions
=============

This folder contains pre-built browser binaries of AssemblyScript.

Note that Binaryen and WABT are not included in the bundle. A compatible version of Binaryen can be obtained [from the binaryen.js repository](https://github.com/dcodeIO/binaryen.js) and of WABT [from the wabt.js repository](https://github.com/dcodeIO/wabt.js).

Usage
-----

Local:

```html
<script src="binaryen.js"></script>
<script src="wabt.js"></script><!-- optional -->
<script src="assemblyscript.js"></script>
```

CDN:

```html
<script src="//rawgit.com/dcodeIO/binaryen.js/master/index.js"></script>
<script src="//rawgit.com/dcodeIO/wabt.js/master/index.js"></script><!-- optional -->
<script src="//rawgit.com/dcodeIO/AssemblyScript/master/dist/assemblyscript.js"></script>
```

When using the CDN, remember to replace `master` with the exact versions / tags your application depends upon, if applicable.

Example
-------

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
