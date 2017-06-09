define(['vs/editor/editor.main'], function() {
  monaco.languages.register({ id: 'wast' });

  monaco.languages.setLanguageConfiguration('wast', {
    brackets: [
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '(', close: ')' }
    ],
    surroundingPairs: [
      { open: '(', close: ')' }
    ]
  });

  monaco.languages.setMonarchTokensProvider('wast', {

    keywords: [
      "module",
      "type",
      "memory",
      "export",
      "import",
      "func",
      "global",
      "local",
      "param",
      "result"
    ],

    types: [
      "i32",
      "i64",
      "f32",
      "f64",
      "none"
    ],

    operations: [

      // Control flow
      "unreachable",
      "nop",
      "block",
      "loop",
      "if",
      "else",
      "end",
      "br",
      "br_if",
      "br_tabler",
      "return",

      // Call
      "call",
      "call_indirect",

      // Parametric
      "drop",
      "select",

      // Variable access
      "get_local",
      "set_local",
      "tee_local",
      "get_global",
      "set_global",

      // Memory related
      "load",
      "load8_s",
      "load8_u",
      "load16_s",
      "load16_u",
      "load32_s",
      "load32_u",
      "store",
      "store8",
      "store16",
      "store32",
      "current_memory",
      "grow_memory",

      // Constants
      "const",

      // Comparison
      "eqz",
      "eq",
      "ne",
      "lt_s",
      "lt_u",
      "lt",
      "gt_s",
      "gt_u",
      "gt",
      "le_s",
      "le_u",
      "le",
      "ge_s",
      "ge_u",
      "ge",

      // Numeric
      "clz",
      "ctz",
      "popcnt",
      "add",
      "sub",
      "mul",
      "div_s",
      "div_u",
      "div",
      "rem_s",
      "rem_u",
      "and",
      "xor",
      "or",
      "shl",
      "shr_s",
      "shr_u",
      "rotl",
      "rotr",
      "abs",
      "neg",
      "ceil",
      "floor",
      "trunc",
      "nearest",
      "sqrt",
      "min",
      "max",
      "copysign",

      // Conversion
      "wrap",
      "trunc_s",
      "trunc_u",
      "extend_s",
      "extend_u",
      "convert_s",
      "convert_u",
      "demote",
      "promote",

      // Reinterpretations
      "reinterpret"
    ],

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    tokenizer: {
      root: [

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/"/, 'string', '@string'],

        // numbers (not all of these are generated, but here to be sure)
        [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'],
        [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
        [/0(@octaldigits)[Ll]?/, 'number.octal'],
        [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
        [/(@digits)[fFdD]/, 'number.float'],
        [/(@digits)[lL]?/, 'number'],

        // binaryen names as variables
        [/\$[^\s\)]*/, { token: 'variable' }],

        // identifiers and keywords
        [/[a-zA-Z_$][\w$]*/, {
          cases: {
            '@keywords': { token: 'keyword.$0' },
            '@types': { token: 'type.$0' },
            '@operations': { token: 'entity.name.function.$0', foreground: 'ff0000' },
            '@default': 'identifier'
          }
        }]
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
      ],
    }
  });

});
