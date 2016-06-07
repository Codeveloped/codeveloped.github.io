var Promise = require('bluebird');
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var app = express();


process.env.PORT = process.env.PORT || 3001;


app.use('/api', proxy('http://127.0.0.1:3031', {
    forwardPath: function (req, res) {
        return '/api' + require('url').parse(req.url).path;
    }
}));

app.use('/static', express.static(__dirname + '/static'));


require('./server/middleware/cookie')(app);
require('./server/middleware/session')(app);
require('./server/middleware/csrf')(app);
require('./server/middleware/auth')(app);


var getAuth = require('./server/react/getAuth');
var getFavorites = require('./server/react/getFavorites');
var getVouchers = require('./server/react/getVouchers');

app.use('*', function (req, res, next) {

    var render = function (data) {
        return [
            '<html lang="en">',
                '<head>',
                    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">',
                    '<meta name=viewport content="width=device-width, initial-scale=1 user-scalable=no">',
                    '<meta charset="utf-8">',
                    '<title>Stadjerspas</title>',
                '</head>',
                '<body>',
                    '<section class="react" id="react"></section>',
                    '<script>',
                        'window._csrf = \'', req.csrfToken(), '\';',
                        'window.__INITIAL_DATA__ = ', JSON.stringify(data).replace(/<\/script/ig, '<\\/script').replace(/<!--/ig, '<\\!--'),
                    '</script>',
                    '<script src="/static/bundle.js"></script>',
                '</body>',
            '</html>'
        ].join('');
    };

    Promise.join(
        getAuth(req),
        getFavorites(req),
        getVouchers(req),
        function (auth, favorites, voucher) {
            var html = render({
                auth: auth,
                favorites: favorites,
                voucher: voucher
            });
            res.send(html);
        });

});


//TODO uncomment me
var webpackServer = app.listen(process.env.PORT, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('server listening on port: %s', process.env.PORT);
});
