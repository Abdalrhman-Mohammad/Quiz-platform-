const {validationResult} = require('express-validator');
const {addQuizInput} = require('../input/add_quiz_input.js');
const {
  addQuiz,
  getQuizzes
  // , getQuiz
} = require('../services/quiz_service.js');
const {v4: uuidv4} = require('uuid');
const db = require('../../../db.js');


const addQuizUsingPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({result: errors})
  }
  const title = req.body.title;
  const subjectId = req.body.subjectId;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const quizId = uuidv4();
  // console.log(userId)
  let quiz = new addQuizInput(
      quizId,
      subjectId,
      title,
      start_time,
      end_time,
  );
  const added = await addQuiz(quiz);
  res.json({result: added})
};

const getAllQuizzes = async (req, res) => {
  const {subjectId} = req.params;
  const quizzes = await getQuizzes(subjectId);
  res.json({result: quizzes})
};

// const getQuiz = async (req, res) => {
//   const quizId = req.params.quizId;

//   let students = await getQuiz(quizId);

//   res.json({result: students})
// };
module.exports = {
  addQuizUsingPost,
  getAllQuizzes,
  // getQuiz
}
