var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  mode: "production",
  entry: ["./src/router"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true,
    port: 8008
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: 52
                    }
                  }
                ],
                "@babel/react",
                "@babel/preset-flow"
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true
                  }
                ]
              ]
            }
          }
        ],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("autoprefixer")({ grid: true })]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  }
};
