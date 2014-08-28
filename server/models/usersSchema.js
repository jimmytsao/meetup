'use strict';

var bookshelf = require('../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('users')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('users', function (table) {
        table.increments('users_pk').primary();
        table.bigInteger('facebookUserId').unique().notNullable();
        table.string('firstName');
        table.string('lastName');
        table.string('gender');
        table.string('facebookAccessToken');
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });