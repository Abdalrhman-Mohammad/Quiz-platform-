const {validationResult} = require('express-validator');
const {addQuizInput, addQuestionInput, addAnswerInput} =
    require('../input/add_quiz_input.js');
const {
  addQuiz,
  addQuestion,
  addAnswer,
  getFullQuiz,
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
  questions = [];
  for (let i = 0; i < req.body.questions.length; i++) {
    answers = [];
    for (let j = 0; j < req.body.questions[i].answers.length; j++) {
      const answerId = uuidv4();
      let answer = new addAnswerInput(
          answerId,
          req.body.questions[i].answers[j].content,
      );
      answers.push(answer);
      await addAnswer(answer);
    }
    const questionId = uuidv4();
    let question = new addQuestionInput(
        questionId,
        req.body.questions[i].type,
        req.body.questions[i].text,
        req.body.questions[i].id_ans,
        answers,
        req.body.questions[i].correct_answer,
    );
    questions.push(question);
    await addQuestion(question, quizId);
  }
  let quiz = new addQuizInput(
      quizId, subjectId, title, start_time, end_time, questions);
  const added = await addQuiz(quiz);
  res.json({result: added})
};


const getQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({result: errors})
  }
  console.log(req.body)
  const quizId = req.params.quizId;
  const added = await getFullQuiz(quizId);
  res.json({result: added})
};

module.exports = {
  addQuizUsingPost,
  getQuiz,
}
