const { check } = require('express-validator');

const subjectName = check('name').notEmpty().withMessage('Subject name is required');

const addSubjectValidation = [
    subjectName
];

module.exports = {
    addSubjectValidation
};
