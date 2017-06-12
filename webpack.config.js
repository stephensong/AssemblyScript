const webpack = require("webpack");
const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
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
    filename: "./dist/assemblyscript.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  externals: {
    "binaryen": "Binaryen"
  },
  plugins: [
    new webpack.BannerPlugin(banner)
    // new PrepackWebpackPlugin()
  ],
  node: {
    "buffer": "empty",
    "crypto": "empty",
    "fs": "empty",
    "os": "empty",
    "source-map-support": "empty"
  }
};