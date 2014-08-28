'use strict';

var fbHandling = require('./authFbHandlers');

module.exports = function (app) {
  // app === router injected from middleware.js

  app.route('/fb')
    .post(fbHandling.fbLogin);

  app.route('/*', function(req, res){
    res.status(404).end;
  });

};
