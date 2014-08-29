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
require ('../models/schemas/usersSchema.js');
require ('../models/schemas/interestsSchema.js');