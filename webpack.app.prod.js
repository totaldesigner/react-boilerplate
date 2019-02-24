const glob = require('glob');
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin;
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const sourcePath = path.join(__dirname, 'app');

module.exports = {
  name: "app",
  context: __dirname,
  mode: "production",
  entry: ["./app/index.tsx"],
  output: {
    path: __dirname + "/build/app",
    publicPath: "/static/",
    chunkFilename: '[name].[chunkhash].chunk.js',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    nodeEnv: "production",
    runtimeChunk: "single",
    sideEffects: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
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
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.scss$/,
        use: [{
            loader: ExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.VERSION': JSON.stringify(require("./package.json").version)
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ReactLoadablePlugin({
      filename: "./build/server/react-loadable.json",
    }),
    new StatsWriterPlugin({
      filename: "../server/stats.json",
    }),
    new CopyWebpackPlugin([{
      from: "./app/public"
    }]),
    new ExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${sourcePath}/**/*`, {
        nodir: true
      }),
    }),
  ],
};