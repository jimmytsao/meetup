'use strict';

var bookshelf = require('../../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('users_interests_map')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('users_interests_map', function (table) {
        table.increments('users_interests_map_pk').primary();
        table.integer('users_pk').references('users_pk').inTable('users').notNullable();
        table.integer('interests_pk').references('interests_pk').inTable('interests').notNullable();
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });
