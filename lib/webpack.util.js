var pkg = exports.pkg = require("../package.json");

var date = exports.date = (new Date()).toUTCString().replace("GMT", "UTC");

exports.banner = `@license AssemblyScript v${pkg.version} (c) 2017, Daniel Wirtz
Compiled ${date}
Licensed under the Apache-License, Version 2.0
see: https://github.com/dcodeIO/AssemblyScript for details`;

exports.uglifyOptions = {
  mangle: {
    screw_ie8: true,
    except: ['$super', '$', '_']
  },
  beautify : false,
  squeeze  : true,
  minimize : true,
  warnings : false,
  sourceMap: true,

  compress: {
    dead_code   : true,
    screw_ie8   : true,
    sequences   : true,
    booleans    : true,
    loops       : true,
    evaluate    : true,
    unused      : true,
    warnings    : false,
    drop_console: false,
    unsafe      : true,
    reduce_vars : true,
    join_vars   : true,
    comparisons : true,
    conditionals: true,
    properties  : true,
    if_return   : true
  }
};
