'use strict';

var bookshelf = require('../../config/dbConnectConfig.js');

bookshelf.knex.schema.hasTable('interests')
  .then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('interests', function (table) {
        table.increments('interests_pk').primary();
        table.string('interests_name').unique().notNullable();
        table.string('interests_description');
        table.timestamps();
      })
      .then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

/*
INSERT INTO interests (interests_name) VALUES ('Badminton');
INSERT INTO interests (interests_name) VALUES ('Basketball');
INSERT INTO interests (interests_name) VALUES ('Chess');
INSERT INTO interests (interests_name) VALUES ('Cricket');
INSERT INTO interests (interests_name) VALUES ('Cycling');
INSERT INTO interests (interests_name) VALUES ('Golf');
INSERT INTO interests (interests_name) VALUES ('Horse');
INSERT INTO interests (interests_name) VALUES ('Poker');
INSERT INTO interests (interests_name) VALUES ('Polo');
INSERT INTO interests (interests_name) VALUES ('Pool/Snooker');
INSERT INTO interests (interests_name) VALUES ('Rock');
INSERT INTO interests (interests_name) VALUES ('Rugby');
INSERT INTO interests (interests_name) VALUES ('Running');
INSERT INTO interests (interests_name) VALUES ('Shooting');
INSERT INTO interests (interests_name) VALUES ('Soccer');
INSERT INTO interests (interests_name) VALUES ('Squash');
INSERT INTO interests (interests_name) VALUES ('Swimming');
INSERT INTO interests (interests_name) VALUES ('Table');
INSERT INTO interests (interests_name) VALUES ('Tennis');
INSERT INTO interests (interests_name) VALUES ('Workout/Gym');
*/