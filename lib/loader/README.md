AssemblyScript Loader
=====================

[AssemblyScript](https://github.com/dcodeIO/AssemblyScript)'s loader component to run and work with compiled WebAssembly modules, as a stand-alone module.

Usage
-----

```
$> npm install assemblyscript-loader
```

```ts
import load from "assemblyscript-loader"; // JS: var load = require("assemblyscript-loader").load;

load("path/to/module.wasm", {
  imports: {
    ...
  }
}).then(module => {
  ...
  // i.e. call module.exports.main()
});
```

API
---

* **load**(file: `ArrayBuffer | Uint8Array | string`, options: `ILoadOptions`): `Promise<IModule>`<br />
  Loads a WebAssembly module either from a buffer or from a file and returns a promise for an `IModule`.

* **ILoadOptions**<br />
  Options to set up the environment created by `load`.

  * **memory**: `WebAssembly.Memory`<br />
    Memory instance to use, if applicable.
  * **imports**: `{ [key: string]: any }`<br />
    Import elements. Usually functions.

* **IModule**<br />
  Common module interface as returned by `load`.

  * **memory**: `WebAssembly.Memory`<br />
    A reference to the underlying memory instance
  * **buffer**: `Uint8Array`<br />
    An unsigned byte view on the underlying memory.
  * **imports**: `{ [key: string]: any }`<br />
    Imported elements. Usually functions.
  * **exports**: `{ [key: string]: any }`<br />
    Exported elements. Usually functions.
  * **currentMemory**(): `number`<br />
    Gets the current size of the memory in 64kb pages.
  * **growMemory**(numPages: `number`): `number`<br />
    Grows the memory by the specified number of 64kb pages.
  * Various accessors for **byte**, **int**, **string** etc. (todo)
