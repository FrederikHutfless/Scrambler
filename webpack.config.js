//webpack.config.js
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, 'build'),
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
          output: {
            preamble: `/*!
            @license
            Delta Scrambler
            Copyright © 2023 Frederik Hutfleß
            
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
            
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
            
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see <http://www.gnu.org/licenses/>.
            */`
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'var scr = scrambler.Scrambler; scr(); if(cmos!==undefined){plugins.callback("deltascrambler", scr.cmosunload);scr.cmosinit(algorithmRegistration);}',
      raw: true,
      entryOnly: true,
      test: /\.js$/,
      footer: true
    }),
  ],
}