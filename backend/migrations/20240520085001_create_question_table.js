/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE Question (id VARCHAR(255) PRIMARY KEY, type VARCHAR(255) NOT NULL, text VARCHAR(255) NOT NULL , id_ans VARCHAR(255) DEFAULT NULL , FOREIGN KEY (id_ans) REFERENCES Answer(id));')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE Question;')
};
