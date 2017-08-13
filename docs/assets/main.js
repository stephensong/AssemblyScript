var sourceEditor;
var assemblyEditor;
var currentModule;
var currentGist = "dcodeIO/b05ea1f97efb9ceb1ce17667af73793a";
var currentRequest = null;
var uiInitialized = false;

require.config({
  paths: {
    'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs/'
  }
});
require([ 'vs/editor/editor.main', 'assets/sexpr' ], function() {

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

  if (!document.location.hash.substring(1))
    document.location.hash = currentGist;
  else
    currentGist = document.location.hash.substr(1);

  loadGist(currentGist);
  setInterval(function() {
    var newGist = document.location.hash.substring(1);
    if (newGist !== currentGist) {
      currentGist = newGist;
      loadGist(newGist);
    }
  }, 100);
});

function compile() {
  if (currentModule)
    currentModule.dispose();

  var source = sourceEditor.getValue();
  currentModule = assemblyscript.Compiler.compileString(source, {
    silent: true,
    target: assemblyscript.CompilerTarget.WASM32,
    noRuntime: !/\bnew\b/.test(source)
  });

  var diagnostics = assemblyscript.typescript.formatDiagnostics(assemblyscript.Compiler.lastDiagnostics).trim();
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

function loadGist(gist) {
  if (currentRequest) return;
  var match = /\/([a-f0-9]{32})$/.exec(gist);
  if (match) {
    currentRequest = document.createElement("script");
    currentRequest.type = "text/javascript";
    currentRequest.src = "https://api.github.com/gists/" + match[1] + "?callback=onGistLoaded";
    document.body.appendChild(currentRequest);
  } else
    alert("Not a valid gist url:\n\n" + gist);
}

function onGistLoaded(gist) {
  if (currentRequest) {
    document.body.removeChild(currentRequest);
    currentRequest = null;
  }
  try {
    if (gist.meta.status !== 200) {
      alert("Failed to load gist: status " + gist.meta.status + "\n\n" + currentGist);
      return;
    }
    var data = gist.data.files[Object.keys(gist.data.files)[0]].content;
    sourceEditor.setValue(data);
    if (!uiInitialized) {
      var btn = document.getElementById("compile-button");
      btn.style.display = "block";
      btn.onclick = compile;
      btn = document.getElementById("download-button");
      btn.style.display = "block";
      btn.onclick = download;
      uiInitialized = true;
    }
    compile();
  } catch (e) {
    alert("Failed to load gist: " + e.message + "\n\n" + currentGist);
  }
}
