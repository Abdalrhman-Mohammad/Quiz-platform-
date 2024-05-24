/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE User (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL)');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE User');
};
