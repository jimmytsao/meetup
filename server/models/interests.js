'use strict';

var bookshelf = require('../config/dbConnectConfig.js');

module.exports = bookshelf.Model.extend({
  tablename: 'interests',
  idAttribute: 'interests_pk',
  hasTimestamps: true
});