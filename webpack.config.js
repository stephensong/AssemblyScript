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
  }
};