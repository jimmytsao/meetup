'use strict';

var dashboardHandlers = require('../dashboard/dashboardHandlers.js');

module.exports = function (app) {
  // app === router injected from middleware.js

  app.route('/')
    .get(dashboardHandlers.sendDashboardInterests);

  app.route('/*', function(req, res){
    res.status(404).end();
  });

};
