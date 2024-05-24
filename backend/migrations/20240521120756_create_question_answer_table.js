/**
 * @param { import("knex").Knex } knex
 * @returns { void }
 */
const db = require('../db');
exports.up = function(knex) {
  db.query(
      'CREATE TABLE question_answer (question_id VARCHAR(255) NOT NULL,  answer_id VARCHAR(255) NOT NULL   , FOREIGN KEY (answer_id) REFERENCES Answer(id), FOREIGN KEY (question_id) REFERENCES Question(id));')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
