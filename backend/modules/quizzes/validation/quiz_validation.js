const { check } = require('express-validator');

const quiztitle = check('title').notEmpty().withMessage('Quiz name is required');
const subjectId = check('subjectId').notEmpty().withMessage('Subject is required');
const start_time = check('start_time').notEmpty().withMessage('Start time is required');
const end_time = check('end_time').notEmpty().withMessage('End time is required');

const addQuizValidation = [quiztitle , subjectId, start_time, end_time];

module.exports = {addQuizValidation};
