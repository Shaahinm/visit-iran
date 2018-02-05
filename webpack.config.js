const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";
var cssDev = ["style-loader", "css-loader", "sass-loader"];
var cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  // use: ["css-loader", "resolve-url-loader", "sass-loader"]
  // use: 'css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap'
  use: ["css-loader", "resolve-url-loader", "sass-loader?sourceMap"]
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: "./src/templates/index/app.js",
    ltr: "./src/templates/ltr/ltr.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.pug$/,
        loaders: ["html-loader", "pug-html-loader"]
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loaders: [
      //     "file-loader?name=images/[name].[ext]",
      //     "image-webpack-loader"
      //     // "file-loader?name=[name].[ext]&outputPath=images/",
      //   ]
      // }
      {
        // this should be used for prod mode
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              publicPath: "../"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file-loader?name=fonts/[name].[ext]" }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "LAYOUT",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ["ltr"],
      filename: "pages/base.html",
      template: "./src/layout.pug"
    }),
    new HtmlWebpackPlugin({
      title: "INDEX",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ["ltr"],
      filename: "pages/index.html",
      template: "./src/templates/index/index.pug"
    }),
    new HtmlWebpackPlugin({
      title: "DESTINATIONS",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ["ltr"],
      filename: "pages/destinations.html",
      template: "./src/templates/destinations/destinations.pug"
    }),
    // new HtmlWebpackPlugin({
    //   title: "Contact",
    //   hash: true,
    //   chunks: ["contact"],
    //   filename: "contact.html",
    //   template: "./src/templates/contact/contact.html"
    // }),
    new ExtractTextPlugin({
      filename: "style/[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
