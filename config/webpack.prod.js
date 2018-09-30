const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

const path = require("path");
const rootDir = path.resolve(__dirname, "..");

module.exports = webpackMerge(commonConfig, {
  mode: "production",

  output: {
    path: path.resolve(rootDir, "dist"),
    publicPath: "./",
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].chunk.js"
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      }),
      new CompressionPlugin({
        algorithm: "gzip"
      }),
      new BrotliPlugin()
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        WEBPACK: true
      }
    }),
    new InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js"
    })
  ]
});
