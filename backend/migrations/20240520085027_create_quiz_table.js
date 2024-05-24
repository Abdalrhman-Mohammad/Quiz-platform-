/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE Quiz (id VARCHAR(255) PRIMARY KEY,  subject_id VARCHAR(255) NOT NULL ,title VARCHAR(255) NOT NULL,  start_time VARCHAR(255) NOT NULL ,end_time VARCHAR(255) NOT NULL, FOREIGN KEY (subject_id) REFERENCES Subject(id));')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE Quiz;')
  
};
