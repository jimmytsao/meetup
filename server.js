var express = require('express');

var port    = process.env.port || 8000;
var app     = express();

module.exports = app;

// configure our server with all the middleware and and routing
require('./server/config/middleware.js')(app, express);

//configure database connections
require('./server/config/dbConnectConfig.js');

app.listen(port);
console.log('Listening on port '+port);