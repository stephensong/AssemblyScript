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

  * **initialMemory**: `number`<br />
    Initial size of the memory in 64kb pages.
  * **maximumMemory**: `number`<br />
    Maximum size of the memory in 64kb pages.
  * **imports**: `{ [key: string]: any }`<br />
    Import elements. Usually functions.

* **IModule**<br />
  Common module interface as returned by `load`.

  * **memory**: `WebAssembly.Memory`<br />
    A reference to the underlying memory instance.
  * **imports**: `{ [key: string]: any }`<br />
    Imported elements. Usually functions.
  * **exports**: `{ [key: string]: any }`<br />
    Exported elements. Usually functions.
  * **S8**: `Int8Array`<br />
    An 8-bit signed integer view on the memory.
  * **U8**: `Uint8Array`<br />
    An 8-bit unsigned integer view on the memory.
  * **S16**: `Int16Array`<br />
    A 16-bit signed integer view on the memory.
  * **U16**: `Uint16Array`<br />
    A 16-bit unsigned integer view on the memory.
  * **S32**: `Int32Array`<br />
    A 32-bit signed integer view on the memory.
  * **U32**: `Uint32Array`<br />
    A 32-bit unsigned integer view on the memory.
  * **F32**: `Float32Array`<br />
    A 32-bit float view on the memory.
  * **F64**: `Float64Array`<br />
    A 64-bit float view on the memory.
  * **currentMemory**(): `number`<br />
    Gets the current size of the memory in 64kb pages.
  * **growMemory**(numPages: `number`): `number`<br />
    Grows the memory by the specified number of 64kb pages.

**Note** that memory views (I8, U8, etc.) are updated when the module's memory grows, hence make sure to always access them directly on the module instance.
