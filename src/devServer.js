var Promise = require('bluebird');
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);
require('longjohn');

process.env.PORT = process.env.PORT || 3001;

//TODO uncomment me
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static(__dirname + '/static'));


app.use('*', function (req, res, next) {

  var render = function (data) {
    return [
      '<html lang="en">',
        '<head>',
          '<meta charset="utf-8">',
          '<meta name=viewport content="width=device-width, initial-scale=1 user-scalable=no">',
          '<title>Stadjerspas</title>',
        '</head>',
        '<body>',
          '<section class="react" id="react"></section>',
          '<script src="/static/bundle.js"></script>',
        '</body>',
      '</html>'
    ].join('');
  };
  
  res.send(render({}))

});


//TODO uncomment me
var webpackServer = app.listen(process.env.PORT, '127.0.0.1', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server listening on port: %s', process.env.PORT);
});
