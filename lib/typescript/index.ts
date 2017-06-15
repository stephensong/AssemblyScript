const _getScriptKindFromFileName = ts.getScriptKindFromFileName;

(function(getScriptKindFromFileName_original) {
  ts.getScriptKindFromFileName = function getScriptKindFromFileNameEx(fileName) {
    const ext = fileName.substr(fileName.lastIndexOf("."));
    if (ext.toLowerCase() === ".as")
      return ts.ScriptKind.TS;
    return getScriptKindFromFileName_original(fileName);
  }
})(ts.getScriptKindFromFileName);

ts.supportedTypeScriptExtensions.unshift(<ts.Extension>".as");
ts.supportedTypescriptExtensionsForExtractExtension.push(<ts.Extension>".as");

module.exports = ts;
