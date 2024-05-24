const express = require('express');
const router = express.Router();
const {addQuizValidation} = require('../validation/quiz_validation');
const {
  addQuizUsingPost,
  getAllQuizzes
  // , getQuiz
} = require('../controller/quiz_controller');

const {addQuestionUsingPost, getAllQuestions} =
    require('../controller/question_controller');

router.post('/', addQuizValidation, addQuizUsingPost);
router.get('/:subjectId', getAllQuizzes);
router.post('/question', addQuestionUsingPost);
router.get('/question/:quizId', getAllQuestions);
// router.get('/:quizId', getQuiz)
module.exports = router;
