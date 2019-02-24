const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: "server",
  context: __dirname,
  mode: "production",
  entry: ["./server/render.tsx"],
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: __dirname + "/build/server",
    publicPath: "/static/",
    libraryTarget: "commonjs2",
    filename: "render.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        use: [{
          loader: "awesome-typescript-loader",
          options: {
            compilerOptions: {
              module: "esnext",
              target: "esnext",
            },
          },
        }],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          emitFile: false,
          name: "[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              url: false,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      'process.env.VERSION': JSON.stringify(require("./package.json").version),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};