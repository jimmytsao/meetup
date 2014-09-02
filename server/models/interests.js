'use strict';

var bookshelf = require('../config/dbConnectConfig.js');


module.exports = bookshelf.Model.extend({
  tableName: 'interests',
  idAttribute: 'interests_pk',
  hasTimestamps: true
});
