var sourceEditor;
var assemblyEditor;

require.config({
  paths: {
    'vs': 'assets/vs'
  }
});
require([ 'vs/editor/editor.main', 'assets/language-wast-sexpr' ], function() {

  var loadingIcon = document.getElementById('loading-icon');
  loadingIcon.parentNode.removeChild(loadingIcon);

  // Set up TypeScript
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    module: monaco.languages.typescript.ModuleKind.None,
    noLib: true,
    allowNonTsExtensions: true
  });
  monaco.languages.typescript.typescriptDefaults.addExtraLib(assemblyscript.library.libSource, "assembly.d.ts");
  monaco.editor.defineTheme('vs-dark-plus', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'entity.name.function', foreground: 'dcdcaa' },
      { token: 'entity.method.name', foreground: 'dcdcaa' },
      { token: 'storage.type', foreground: '569cd6' },
      { token: 'keyword.control', foreground: 'c586c0' },
      { token: 'meta.preprocessor', foreground: 'c586c0' },
      { token: 'variable.parameter', foreground: '9cdcfe' },
      { token: 'variable', foreground: '9cdcfe' },
      { token: 'variable.name', foreground: '9cdcfe' },
      { token: 'meta.parameter.type.variable', foreground: '9cdcfe' }
    ]
  });

  // Initialize TypeScript editor
  sourceEditor = monaco.editor.create(document.getElementById('source'), {
    value: [
      '// Edit here and press "Compile"',
      '',
      'export function fib(n: int): int {',
      '  let i: int, t: int, a: int = 0, b: int = 1;',
      '  for (i = 0; i \< n; i++) {',
      '    t = a + b; a = b; b = t;',
      '  }',
      '  return b;',
      '}'
    ].join("\n"),
    language: "typescript",
    scrollBeyondLastLine: false,
    theme: "vs-dark-plus",
    automaticLayout: true
  });

  // Initialize WebAssembly editor
  assemblyEditor = monaco.editor.create(document.getElementById('assembly'), {
    value: [
      ''
    ].join("\n"),
    language: "wast",
    scrollBeyondLastLine: false,
    theme: "vs-dark-plus",
    automaticLayout: true,
    readOnly: true
  });

  // Compile once ready
  compile();

  document.getElementById("compile-button").onclick = compile;
  document.getElementById("download-button").onclick = download;
});

var Compiler = assemblyscript.Compiler;
var currentModule;

function compile() {
  if (currentModule)
    currentModule.dispose();

  var source = sourceEditor.getValue();
  currentModule = Compiler.compileString(source, { noLib: !/\bnew\b/.test(source), uintptrSize: 4, silent: true });

  var diagnostics = assemblyscript.typescript.formatDiagnostics(Compiler.lastDiagnostics).trim();
  if (diagnostics.length)
    diagnostics = diagnostics.replace(/^/mg, "// ");

  if (currentModule) {
    currentModule.optimize();
    assemblyEditor.setValue((diagnostics ? diagnostics + "\n\n" : "") + currentModule.emitText());
  } else
    assemblyEditor.setValue(diagnostics);
}

function saveAs(blob, fileName) {
    var url = window.URL.createObjectURL(blob);

    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    // On Edge, revokeObjectURL should be called only after
    // a.click() has completed, atleast on EdgeHTML 15.15048
    setTimeout(function() {
        window.URL.revokeObjectURL(url);
    }, 1000);
}

function download() {
  if (!currentModule) return;
  var buffer = currentModule.emitBinary();
  var blob = new Blob([ buffer ], { type : 'application/octet-stream'});
  saveAs(blob, "module.wasm");
}
