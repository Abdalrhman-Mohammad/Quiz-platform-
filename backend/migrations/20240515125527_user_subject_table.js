/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE user_subject (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255) NOT NULL, subject_id VARCHAR(255) NOT NULL , FOREIGN KEY (user_id) REFERENCES User(id), FOREIGN KEY (subject_id) REFERENCES Subject(id));')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE user_subject')
};
