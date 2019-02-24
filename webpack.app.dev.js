const webpack = require("webpack");
const ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin;

module.exports = {
  name: "app",
  mode: "development",
  entry: ["webpack-hot-middleware/client?reload=true", "./app/index.tsx"],
  output: {
    publicPath: "/static/",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: 'inline-source-map',
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
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
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
    new ReactLoadablePlugin({
      filename: "./server/react-loadable.json",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};