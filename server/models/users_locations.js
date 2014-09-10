'use strict';

var bookshelf = require('../config/dbConnectConfig.js');


var usersLocationsModel = bookshelf.Model.extend({
  tableName: 'users_locations',
  idAttribute: 'users_locations_pk',
  hasTimestamps: true
});


var tableConstants = {
  tableName: 'users_locations',
  columnNames: [
    'users_pk',
    'users_locations_long_lat',
    'created_at',
    'updated_at']
};

module.exports.findUsersLocationsRecord = function(users_pk){

  return usersLocationsModel
    .forge({users_pk: users_pk})
    .fetch();
};

module.exports.createUsersLocationsRecord = function(users_pk, longitude, latitude){

  var currentTimeDate = new Date().toUTCString();

  var sqlInsertQuery = 
    "INSERT INTO " + tableConstants.tableName + " (" + tableConstants.columnNames.join(",") + 
    ") VALUES (" + users_pk + ", ST_GeomFromText('POINT(" + longitude + " " + latitude + ")', 4326), '" +
    currentTimeDate + "','" +currentTimeDate +"');";

  return bookshelf
    .knex.raw(sqlInsertQuery);
};

module.exports.updateUsersLocationRecord = function(users_locations_pk, longitude, latitude){
  
  var currentTimeDate = new Date().toUTCString();
  
  var sqlUpdateQuery = 
  "UPDATE " + tableConstants.tableName + 
  " SET users_locations_long_lat = ST_GeomFromText('POINT(" + longitude + " " + latitude + ")', 4326),"+
  " updated_at='" + currentTimeDate + "'"+
  " WHERE users_locations_pk = " + users_locations_pk +";";

  return bookshelf
    .knex.raw(sqlUpdateQuery);
};
