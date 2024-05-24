/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE quiz_question (quiz_id VARCHAR(255) PRIMARY KEY,  question_id VARCHAR(255) NOT NULL  , difficulty VARCHAR(255)  , FOREIGN KEY (quiz_id) REFERENCES Quiz(id), FOREIGN KEY (question_id) REFERENCES Question(id));')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  db.query('DROP TABLE quiz_question;')
};
