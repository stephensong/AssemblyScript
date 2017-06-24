(function prelude(modules, cache, entry) {
  var previousRequire = typeof require == "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire = typeof require == "function" && require;
        if (!jumped && currentRequire) return currentRequire(name, true);
        if (previousRequire) return previousRequire(name, true);
        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      var m = cache[name] = { exports: {} };
      modules[name][0].call(m.exports, function (x) {
        var id = modules[name][1][x];
        return newRequire(id ? id : x);
      }, m, m.exports, prelude, modules, cache, entry);
    }
    return cache[name].exports;
  }

  // Be nice to CommonJS, especially node
  if (typeof module !== "undefined" && module && module.exports) {
    cache.binaryen = { exports: previousRequire("binaryen") };
    var wabt; try { wabt = previousRequire("wabt"); } catch (e) {}
    cache.wabt = { exports: wabt || null };
    module.exports = newRequire(entry[0]);

  // Be nice to AMD
  } else if (typeof define === "function" && define.amd) {
    define(["binaryen", "wabt"], function(binaryen, wabt) {
      cache.binaryen = { exports: binaryen };
      cache.wabt = { exports: wabt || null };
      return newRequire(entry[0]);
    });

  // Otherwise expose globally
  } else {
    var g = typeof global !== "undefined" && global
         || typeof window !== "undefined" && window
         || this;
    if (g.Binaryen) cache.binaryen = { exports: g.Binaryen };
    cache.wabt = { exports: g.wabt || null };
    g.assemblyscript = newRequire(entry[0]);
  }

  return newRequire;
})