const webpack = require("webpack");
const util = require("./lib/webpack.util");

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
      { test: /\.js(?:\.map)?$/, use: "source-map-loader", enforce: "pre" },
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  externals: {
    "binaryen": "Binaryen",
    "../lib/wabt": "wabt"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(util.banner),
    new webpack.optimize.UglifyJsPlugin(util.uglifyOptions)
  ],
  node: {
    "buffer": "empty",
    "crypto": "empty",
    "fs": "empty",
    "os": "empty",
    "source-map-support": "empty"
  }
};
