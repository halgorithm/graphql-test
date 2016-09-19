var path = require('path');
module.exports = {
  entry: './client/js/main.js',
  output: {
    path: __dirname + '/client/public/js/',
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      }
    ]
  }
};
