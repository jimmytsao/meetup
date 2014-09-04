'use strict';

var interestsHandling = require('./interestsHandlers.js');
var submissionHandling = require('./submissionHandlers.js');

module.exports = function (app) {
  // app === router injected from middleware.js
  app.route('/interests')
    .get(interestsHandling.sendInterests);

  app.route('/')
    .post(submissionHandling.processSubmission);

  app.route('/*', function(req, res){
    res.status(404).end();
  });

};
