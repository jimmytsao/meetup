'use strict';

var morgan      = require('morgan');
var bodyParser  = require('body-parser');

module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/ionic/www'));

  // // Express 4 allows us to use multiple routers with their own configurations
  var authHandling = express.Router();
  // var routeHandling2 = express.Router();
  app.use('/auth', authHandling); 
  // app.use('/api/route2', routeHandling2);

  // // inject our routers into their perspective route files
  require('../auth/authRouting.js')(authHandling);
  // require('../feature/routeHandling2.js')(routeHandling2);
};