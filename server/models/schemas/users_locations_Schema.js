'use strict';

var bookshelf = require('../../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('users_locations')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema
        .createTable('users_locations', function (table) {
        table.increments('users_locations_pk').primary();
        table.integer('users_pk').references('users_pk').inTable('users');
        table.specificType('users_locations_long_lat', 'GEOMETRY(Point, 4326)');
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });