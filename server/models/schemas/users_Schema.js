'use strict';

var bookshelf = require('../../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('users')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema

        // Remove Later
        // .dropTable('users')
        
        .createTable('users', function (table) {
        table.increments('users_pk').primary();
        table.bigInteger('facebook_user_id').unique().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.string('gender');
        table.string('facebook_access_token');
        table.boolean('active_account');
        table.boolean('completed_setup');
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });