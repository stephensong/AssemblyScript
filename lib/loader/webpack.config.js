var webpack = require("webpack");
var util = require("../webpack.util");

module.exports = {
  entry: "./index.ts",
  devtool: "source-map",
  output: {
    filename: "./build/index.js"
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(util.uglifyOptions)
  ]
};
