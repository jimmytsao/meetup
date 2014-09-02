'use strict';

var interestsHandling = require('./interestsHandlers');

module.exports = function (app) {
  // app === router injected from middleware.js
  app.route('/interests')
    .get(interestsHandling.sendInterests);

  app.route('/*', function(req, res){
    res.status(404).end();
  });

};
