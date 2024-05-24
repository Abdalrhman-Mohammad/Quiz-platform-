const express = require('express');
const router = express.Router();
const { addSubjectValidation } = require('../validation/user_validation');
const {addSubjectUsingPost , getAllSubjects , getAllUsersInSubject} = require('../controller/controller');

router.post('/subject' , addSubjectValidation , addSubjectUsingPost);
router.get('/subjects/:userId', getAllSubjects);
router.get('/subject/users/:subjectId' , getAllUsersInSubject)
module.exports = router;
