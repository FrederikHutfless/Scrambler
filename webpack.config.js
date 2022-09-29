//webpack.config.js
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "scrambler.min.js",
    libraryTarget: 'var',
    library: 'scrambler'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /^\**!|@preserve|@license|@cc_on/i,
          }
        },
        extractComments: false
      })
    ]
  }
};
