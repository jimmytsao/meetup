'use strict';

if (!process.env){
  var devDbConnect = require('./devConstants.js').dbConnectionInfo;
}

var host = process.env.dbHost || devDbConnect.host;
var user = process.env.dbUser || devDbConnect.user;
var password = process.env.dbPassword || devDbConnect.password;
var database = process.env.dbDatabase || devDbConnect.database;

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : host,
    user     : user,
    password : password,
    database : database,
    charset  : 'utf8'
  }
});

module.exports = require('bookshelf')(knex);

//DB Table Schemas
require ('../models/usersSchema.js');