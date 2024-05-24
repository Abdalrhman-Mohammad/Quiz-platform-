const db = require('../../../db');
const addQuiz = async (quiz) => {
  return await new Promise((resolve, reject) => {
    db.query(
        'INSERT into Quiz( id, title,subject_id,start_time,end_time) values(?,?,?,?,?)',
        [
          quiz.quizId, quiz.title, quiz.subjectId, quiz.start_time,
          quiz.end_time
        ],
        (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          for (let i = 0; i < quiz.questions.length; i++) {
            db.query(
                'INSERT into quiz_question( quiz_id,  question_id,difficulty) values(?,?,?)',
                [
                  quiz.quizId,
                  quiz.questions[i].questionId,
                  null,
                ],
                (error, results) => {
                  if (error) {
                    console.log(error);
                    reject(error);
                  }
                });
          }
          resolve('quiz added successfully');
        });
  })
};


const addQuestion = async (question) => {
  return await new Promise((resolve, reject) => {
    db.query(
        'INSERT into Question( id, type,text,id_ans) values(?,?,?,?)',
        [
          question.questionId,
          question.type,
          question.text,
          question.answers[question.correct_answer].answerId,
        ],
        (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          for (let i = 0; i < question.answers.length; i++) {
            db.query(
                'INSERT into question_answer( question_id, answer_id) values(?,?)',
                [
                  question.questionId,
                  question.answers[i].answerId,
                ],
                (error, results) => {
                  if (error) {
                    console.log(error);
                    reject(error);
                  }
                });
          }
          resolve('Question added successfully');
        });
  })
};
const addAnswer = async (quiz) => {
  return await new Promise((resolve, reject) => {
    db.query(
        'INSERT into Answer( id, content) values(?,?)',
        [
          quiz.answerId,
          quiz.content,
        ],
        (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve('Answer added successfully');
        });
  });
};



const getFullQuiz = (quizId) => {
  return new Promise((resolve, reject) => {
    db.query(
        `
        SELECT *
        FROM quiz_question
        JOIN Question
        ON quiz_question.question_id = Question.id
        JOIN Quiz
        ON quiz_question.quiz_id = Quiz.id
        JOIN question_answer
        ON quiz_question.question_id = question_answer.question_id
        JOIN Answer
        ON question_answer.answer_id = Answer.id
        WHERE quiz_id = ?
        `,

        [quizId], (error, results) => {
          if (error) {
            return reject(error);
          }
          console.log(results);
          const ret = {
            quizId: quizId,
            quizTitle: results[0].title,
            difficulty: results[0].difficulty,
            startTime: results[0].start_time,
            endTime: results[0].end_time,
          };
          questionsObject = {};
          questions = [];
          for (let i = 0; i < results.length; i++) {
            console.log(questionsObject.hasOwnProperty(results[i].question_id));
            if (questionsObject.hasOwnProperty(results[i].question_id)) {
              console.log('here', i);
              continue;
            }
            answers = [];
            for (let j = 0; j < results.length; j++) {
              if (results[i].question_id == results[j].question_id) {
                answers.push({
                  answerId: results[j].answer_id,
                  answerText: results[j].content
                });
              }
            }
            questions.push({
              questionId: results[i].question_id,
              questionText: results[i].text,
              questionType: results[i].type,
              idAns: results[i].id_ans,
              answers: answers
            });
            questionsObject[results[i].question_id] = 1;
          }
          ret.questions = questions;
          resolve(ret);
        });
  });
};
module.exports = {
  addQuiz,
  addQuestion,
  addAnswer,
  getFullQuiz,
}