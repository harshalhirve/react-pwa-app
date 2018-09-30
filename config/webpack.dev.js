const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const rootDir = path.resolve(__dirname, "..");
const c = require("./webpack.constants");

module.exports = webpackMerge(commonConfig, {
  mode: "development",

  devtool: "cheap-module-eval-source-map",

  output: {
    path: path.resolve(rootDir, "dist"),
    publicPath: "http://localhost:" + c.PORT + "/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/"
  },

  devServer: {
    inline: true,
    overlay: true,
    port: 3000,
    historyApiFallback: true,
    stats: "minimal",
    hot: true,
    stats: {
      colors: true
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        WEBPACK: true
      }
    })
  ]
});
