// TODO share common code between all webpack config files
module.exports = {
  entry: {
    'app': './src/client/js/main.js',
  },
  output: {
    path: __dirname + '/build/client/public/js/',
    filename: '[name].js'
  },
  // devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
