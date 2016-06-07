var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, '../'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        DEVICE: 'browser'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015&presets[]=stage-0&presets[]=stage-1&presets[]=stage-2&presets[]=stage-3'],
      include: path.join(__dirname, 'client')
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }]
  }
};
