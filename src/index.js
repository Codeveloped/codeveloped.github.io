var express = require('express');
var app = express();

require('./server/middleware/logging')(app);
require('./server/middleware/cookie')(app);
require('./server/middleware/session')(app);
require('./server/middleware/csrf')(app);
require('./server/middleware/auth')(app);
require('./server/middleware/body-parser')(app);

require('./server/apps/routes')(app);


app.listen(3031, '0.0.0.0', function () {
    console.log('api listening at http://0.0.0.0:3031');
});

