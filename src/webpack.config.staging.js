var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './client/index'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'staging')
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
            loaders: ['babel?presets[]=react&presets[]=es2015&presets[]=stage-0&presets[]=stage-1&presets[]=stage-2&presets[]=stage-3'],
            include: path.join(__dirname, 'client')
        }, {
            test: /\.css?$/,
            loaders: ['style', 'raw']
        }]
    }
};
