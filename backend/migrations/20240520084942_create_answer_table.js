/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');

exports.up = function(knex) {
  db.query(
      'CREATE TABLE Answer (id VARCHAR(255) PRIMARY KEY, content VARCHAR(255) NOT NULL);')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE Answer;')
};
