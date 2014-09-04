'use strict';

var bookshelf = require('../../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('users_profiles')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema
        .createTable('users_profiles', function (table) {
        table.increments('users_profiles_pk').primary();
        table.integer('users_pk').references('users_pk').inTable('users');
        table.text('users_bio');
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });