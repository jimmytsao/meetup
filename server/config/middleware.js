'use strict';

var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var jwtCheck     = require('../auth/authJWT.js').jwtCheck;
module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/ionic/www'));

  //Routers
  var authHandling = express.Router();
  app.use('/auth', authHandling); 
  require('../auth/authRouting.js')(authHandling);

  var signupHandling = express.Router();
  app.use('/signup', jwtCheck, signupHandling);
  require('../signup/signupRouting.js')(signupHandling);
};