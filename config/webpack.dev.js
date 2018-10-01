const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const rootDir = path.resolve(__dirname, "..");
const c = require("./webpack.constants");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
  mode: "development",

  devtool: "cheap-module-eval-source-map",

  output: {
    path: path.resolve(rootDir, "dist"),
    publicPath: "http://localhost:" + c.PORT + "/",
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/"
  },

  devServer: {
    inline: true,
    overlay: true,
    port: c.PORT,
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
    }),
    new InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js"
    })
  ]
});
