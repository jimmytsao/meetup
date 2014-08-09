'use strict';

var morgan      = require('morgan');
var bodyParser  = require('body-parser');

module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/public'));

  // // Express 4 allows us to use multiple routers with their own configurations
  // var routeHandling1 = express.Router();
  // var routeHandling2 = express.Router();
  // app.use('/api/route1', routeHandling1); 
  // app.use('/api/route2', routeHandling2);

  // // inject our routers into their perspective route files
  // require('../feature/routeHandling1.js')(routeHandling1);
  // require('../feature/routeHandling2.js')(routeHandling2);
};