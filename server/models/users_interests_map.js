'use strict';

var bookshelf = require('../config/dbConnectConfig.js');


module.exports = bookshelf.Model.extend({
  tableName: 'users_interests_map',
  idAttribute: 'users_interests_map_pk',
  hasTimestamps: true
});
