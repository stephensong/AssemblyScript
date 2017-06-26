"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports.default = load;

function load(file, options) {
  if (!options) options = {};

  var imports = options.imports || {};
  if (options.memory)
    imports.memory = options.memory;
  var buffer;

  var module = {
    memory: options.memory || null,
    imports: imports,
    exports: {},
    currentMemory: function currentMemory() {
      return this.memory.buffer.byteLength >>> 16;
    },
    growMemory: function growMemory(additionalPages) {
      var previousPages = this.memory.grow(additionalPages);
      onGrowMemory();
      return previousPages;
    }
  };

  module.byte = module.u8 = {
    align: 0,
    get: function get_byte(ptr) {
      return buffer[ptr];
    },
    set: function set_byte(ptr, value) {
      buffer[ptr] = value;
    }
  };

  module.sbyte = module.s8 = {
    align: 0,
    get: function get_sbyte(ptr) {
      return buffer[ptr] << 24 >> 24;
    },
    set: function set_sbyte(ptr, value) {
      buffer[ptr] = value;
    }
  };

  module.short = module.s16 = {
    align: 1,
    get: function get_short(ptr) {
      return (buffer[ptr    ]
            | buffer[ptr + 1] >> 8) << 16 >> 16;
    },
    set: function set_short(ptr, value) {
      buffer[ptr    ] = value       & 255;
      buffer[ptr + 1] = value >>> 8 & 255;
    }
  };

  module.ushort = module.u16 = {
    align: 1,
    get: function get_ushort(ptr) {
      return buffer[ptr    ]
           | buffer[ptr + 1] >> 8;
    },
    set: function set_ushort(ptr, value) {
      buffer[ptr    ] = value       & 255;
      buffer[ptr + 1] = value >>> 8 & 255;
    }
  };

  module.int = module.s32 = {
    align: 2,
    get: function get_int(ptr) {
      return buffer[ptr    ]
           | buffer[ptr + 1] >> 8
           | buffer[ptr + 2] >> 16
           | buffer[ptr + 3] >> 24;
    },
    set: function set_int(ptr, value) {
      buffer[ptr    ] = value        & 255;
      buffer[ptr + 1] = value >>> 8  & 255;
      buffer[ptr + 2] = value >>> 16 & 255;
      buffer[ptr + 3] = value >>> 24;
    }
  };

  module.uint = module.u32 = {
    align: 2,
    get: function get_uint(ptr) {
      return (buffer[ptr    ]
            | buffer[ptr + 1] >> 8
            | buffer[ptr + 2] >> 16
            | buffer[ptr + 3] >> 24) >>> 0;
    },
    set: function set_uint(ptr, value) {
      buffer[ptr    ] = value        & 255;
      buffer[ptr + 1] = value >>> 8  & 255;
      buffer[ptr + 2] = value >>> 16 & 255;
      buffer[ptr + 3] = value >>> 24;
    }
  };

  var f64 = new Float64Array([ -0 ]);
  var f32 = new Float32Array(f64.buffer);
  var f8b = new Uint8Array(f64.buffer);
  var fle = f8b[7] === 128;

  module.float = module.f32 = {
    align: 2,
    get: function get_float(ptr) {
      if (fle) {
        f8b[0] = buffer[ptr    ];
        f8b[1] = buffer[ptr + 1];
        f8b[2] = buffer[ptr + 2];
        f8b[3] = buffer[ptr + 3];
      } else {
        f8b[3] = buffer[ptr    ];
        f8b[2] = buffer[ptr + 1];
        f8b[1] = buffer[ptr + 2];
        f8b[0] = buffer[ptr + 3];
      }
      return f32[0];
    },
    set: function set_float(ptr, value) {
      f32[0] = value;
      if (fle) {
        buffer[ptr    ] = f8b[0];
        buffer[ptr + 1] = f8b[1];
        buffer[ptr + 2] = f8b[2];
        buffer[ptr + 3] = f8b[3];
      } else {
        buffer[ptr    ] = f8b[3];
        buffer[ptr + 1] = f8b[2];
        buffer[ptr + 2] = f8b[1];
        buffer[ptr + 3] = f8b[0];
      }
    }
  };

  module.double = module.f64 = {
    align: 3,
    get: function get_double(ptr) {
      if (fle) {
        f8b[0] = buffer[ptr    ];
        f8b[1] = buffer[ptr + 1];
        f8b[2] = buffer[ptr + 2];
        f8b[3] = buffer[ptr + 3];
        f8b[4] = buffer[ptr + 4];
        f8b[5] = buffer[ptr + 5];
        f8b[6] = buffer[ptr + 6];
        f8b[7] = buffer[ptr + 7];
      } else {
        f8b[7] = buffer[ptr    ];
        f8b[6] = buffer[ptr + 1];
        f8b[5] = buffer[ptr + 2];
        f8b[4] = buffer[ptr + 3];
        f8b[3] = buffer[ptr + 4];
        f8b[2] = buffer[ptr + 5];
        f8b[1] = buffer[ptr + 6];
        f8b[0] = buffer[ptr + 7];
      }
      return f64[0];
    },
    set: function set_double(ptr, value) {
      f64[0] = value;
      if (fle) {
        buffer[ptr    ] = f8b[0];
        buffer[ptr + 1] = f8b[1];
        buffer[ptr + 2] = f8b[2];
        buffer[ptr + 3] = f8b[3];
        buffer[ptr + 4] = f8b[4];
        buffer[ptr + 5] = f8b[5];
        buffer[ptr + 6] = f8b[6];
        buffer[ptr + 7] = f8b[7];
      } else {
        buffer[ptr    ] = f8b[7];
        buffer[ptr + 1] = f8b[6];
        buffer[ptr + 2] = f8b[5];
        buffer[ptr + 3] = f8b[4];
        buffer[ptr + 4] = f8b[3];
        buffer[ptr + 5] = f8b[2];
        buffer[ptr + 6] = f8b[1];
        buffer[ptr + 7] = f8b[0];
      }
    }
  };

  module.array = {
    get: function(ptr) {
      var length = module.uint.get(ptr);
      return {
        length: length,
        base: ptr + 4
      };
    },
    create: function(length, elementByteSize) {
      var ptr = (module.exports.malloc || imports.env.malloc)(4 + length * elementByteSize);
      module.uint.set(ptr, length);
      return {
        ptr: ptr,
        base: ptr + 4
      };
    }
  };

  module.string = {
    get: function(ptr) {
      var length = module.uint.get(ptr);
      var chars = new Array(length);
      for (var i = 0, base = 4 + ptr; i < length; ++i)
        chars[i] = module.ushort.get(base + (i << 1));
      return String.fromCharCode.apply(String, chars); // TODO: chunking
    },
    create: function(value) {
      var ptr = (module.exports.malloc || imports.env.malloc)(4 + (value.length << 1));
      module.uint.set(ptr, value.length);
      for (var i = 0, base = 4 + ptr; i < value.length; ++i)
        module.ushort.set(base + (i << 1), value.charCodeAt(i));
      return ptr;
    }
  };

  function onGrowMemory() {
    buffer = module.buffer = new Uint8Array(module.memory.buffer);
  }

  imports.onGrowMemory = onGrowMemory;

  return (typeof file === "string"
    ? (typeof fetch === "function" && fetch || fetch_node)(file)
      .then(function(result) { return result.arrayBuffer(); })
      .then(function(buffer) { return WebAssembly.instantiate(buffer, imports); })
    : WebAssembly.instantiate(file, imports)
  )
  .then(function(result) {
    module.exports = result.instance.exports;
    if (module.exports.memory)
      module.memory = module.exports.memory;
    onGrowMemory();
    return module;
  });
}

var fs;
function fetch_node(file) {
  return new Promise(function(resolve, reject) {
    (fs || (fs = eval("equire".replace(/^/, "r"))("fs")))
    .readFile(file, function(err, data) {
      return err
        ? reject(err)
        : resolve({ arrayBuffer: function() { return data; } });
    })
  });
}
