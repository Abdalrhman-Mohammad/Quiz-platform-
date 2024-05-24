const {validationResult} = require('express-validator');
const {addQuestionInput} = require('../input/add_question_input.js');
const {
  addQuestion,
  getQuestions,
  // , getQuiz
} = require('../services/question_service.js');
const {v4: uuidv4} = require('uuid');
const db = require('../../../db.js');


const addQuestionUsingPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({result: errors})
  }
  const type = req.body.type;
  const text = req.body.text;
  const quizId = req.body.quizId;
  const questionId = uuidv4();
  let question = new addQuestionInput(questionId, text, type);
  const added = await addQuestion(question, quizId);
  res.json({result: added})
};

const getAllQuestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({result: errors})
  }
  console.log(req.body)
  const quizId = req.params.quizId;
  const added = await getQuestions(quizId);
  res.json({result: added})
};

module.exports = {
  addQuestionUsingPost,
  getAllQuestions,
  // getQuiz
}
