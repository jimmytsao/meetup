'use strict';

var bookshelf = require('../config/dbConnectConfig.js');

module.exports = bookshelf.Model.extend({
  tableName: 'users_profiles',
  idAttribute: 'users_profiles_pk',
  hasTimestamps: true
});