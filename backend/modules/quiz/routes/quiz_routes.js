const express = require('express');
const router = express.Router();
const {addQuizValidation} = require('../validation/quiz_validation');
const {
  addQuizUsingPost,
  getQuiz,
} = require('../controller/quiz_controller');

router.post('/', addQuizValidation, addQuizUsingPost);
router.get('/:quizId', getQuiz);
// router.get('/:quizId', getQuiz)
module.exports = router;
//