module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    filename: "./out/webpack-bundle.js"
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