'use strict';

var bookshelf = require('../config/dbConnectConfig.js');

module.exports = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'users_pk',
  defaults: {
    active_account: true
  },
  hasTimestamps: true
});