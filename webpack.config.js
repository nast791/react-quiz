const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // mode: "development", // development/production
  // devtool: 'source-map',
  devServer: {
    port: 8080, // http://localhost:8080/
    historyApiFallback: true,
    // contentBase: './docs',
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name]-[hash:4].js'
  },

  module: {
    rules: [
      // JS
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      // JSON
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "data",
            name: "[name]-[sha1:hash:4].[ext]"
          }
        }]
      },

      // CSS
      {
        test: /\.(css)$/,
        exclude: /static\/.*\.(css)$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ]
      },


      // SCSS/SASS
      {
        test: /\.(s[ca]ss)$/,
        use: [ MiniCssExtractPlugin.loader,"css-loader", "sass-loader"]
      },

      // IMG
      {
        test: /\.(png|jpg|jpeg|gif|ico|webp|svg)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name]-[sha1:hash:4].[ext]"
          }
        }]
      },

      // FONTS
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "fonts",
            name: "[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      buildTime: new Date().toString(),
      template: "static/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "main-[hash:4].css"
    }),
    new CopyPlugin([
      { from: 'static', to: '' },
    ]),
  ]
};