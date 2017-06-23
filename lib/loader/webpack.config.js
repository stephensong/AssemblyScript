var webpack = require("webpack");
var util = require("../webpack.util");

module.exports = {
  entry: "./assemblyscript-loader.ts",
  devtool: "source-map",
  output: {
    libraryTarget: "umd",
    filename: "./dist/assemblyscript-loader.js"
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
