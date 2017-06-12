const webpack = require("webpack");
//const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const pkg = require("./package.json");

const date = (new Date()).toUTCString().replace("GMT", "UTC");
const banner = `@license AssemblyScript v${pkg.version} (c) 2017, Daniel Wirtz
Compiled ${date}
Licensed under the Apache-License, Version 2.0
see: https://github.com/dcodeIO/AssemblyScript for details`;

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    filename: "./dist/assemblyscript.min.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.js$/, use: "source-map-loader", enforce: "pre" },
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  externals: {
    "binaryen": "Binaryen"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({
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
    })
  ],
  node: {
    "buffer": "empty",
    "crypto": "empty",
    "fs": "empty",
    "os": "empty",
    "source-map-support": "empty"
  }
};
