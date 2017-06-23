const webpack = require("webpack");
const util = require("./lib/webpack.util");
const dts = require("dts-bundle");
const fs = require("fs");
const chalk = require("chalk");
const rimraf = require("rimraf");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    libraryTarget: "umd",
    filename: "./dist/assemblyscript.js"
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
  externals: [
    {
      binaryen: {
        commonjs: "binaryen",
        root: "Binaryen",
        optional: false
      },
      buffer: {
        commonjs: ["buffer", "Buffer"],
        optional: true
      },
      fs: {
        commonjs: "fs",
        optional: true
      },
      os: {
        commonjs: "os",
        optional: true
      },
      wabt: {
        commonjs: "wabt",
        root: "wabt",
        optional: true
      }
    }
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(util.banner),
    new webpack.optimize.UglifyJsPlugin(util.uglifyOptions),
    new BundleDefinitionsPlugin(),
    new CleanupPlugin()
  ],
  node: {
    "source-map-support": "empty"
  }
};

function BundleDefinitionsPlugin() {}
BundleDefinitionsPlugin.prototype.apply = function(compiler) {
  const targetFile = __dirname + "/dist/assemblyscript.d.ts";
  const seen = {};
  compiler.plugin("done", function() {
    console.log("");
    dts.bundle({
      name: "assemblyscript",
      main: __dirname + "/out/index.d.ts",
      exclude: function(file, external) {
        const excluded = external || /[\/\\^]lib[\/\\]typescript[\/\\]build$/.test(file);
        if (!seen[file])
          console.log("[dts] " + (excluded ? chalk.yellow("excluding " + file) : chalk.green("including " + file)));
        seen[file] = true;
        return excluded;
      },
      out: targetFile,
      indent: "  ",
      externals: false,
      referenceExternals: false
    });
  });
};

function CleanupPlugin() {}
CleanupPlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function() {
    rimraf(__dirname + "/out", function() {
      console.log(chalk.reset("cleaned up"));
    });
  });
};
