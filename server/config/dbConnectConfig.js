'use strict';

if (!process.env.isProduction){
  var devDbConnect = require('./devConstants.js').dbConnectionInfo;
}

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.dbHost || devDbConnect.host,
    user     : process.env.dbUser || devDbConnect.user,
    password : process.env.dbPassword || devDbConnect.password,
    database : process.env.dbDatabase || devDbConnect.database,
    charset  : 'utf8'
  }
});

module.exports = require('bookshelf')(knex);

//DB Table Schemas
require ('../models/schemas/users_Schema.js');
require ('../models/schemas/interests_Schema.js');
require ('../models/schemas/users_interests_map_Schema.js');
require ('../models/schemas/users_profiles_Schema.js');