const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basePath = path.join(__dirname, "..");

module.exports = {
  entry: "./src/index.tsx",

  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(basePath, "build"),
    clean: true,
  },

  devtool: "inline-source-map",

  devServer: {
    static: "./build",
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
