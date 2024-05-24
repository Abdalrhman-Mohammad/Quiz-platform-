const db = require('../../../db');
const addQuestion = async (question, quizId) => {
  return await new Promise((resolve, reject) => {
           console.log('-----------------------------')
           db.query(
               'INSERT into Question( id, text,type,id_ans) values(?,?,?,?)',
               [question.id, question.text, question.type, question.id_ans],
               (error, results) => {
                 console.log('-----------------------------')
                 console.log('-----------------------------')
                 if (error) {
                   console.log(error);
                   reject(error);
                 }
                 console.log('-----------------------------')
                 db.query(
                     'INSERT into quiz_question( quiz_id,question_id,difficulty) values(?,?,?)',
                     [quizId, question.id, 'easy'], (error, results) => {
                       if (error) {
                         console.log(error);
                         reject(error);
                       }
                       resolve('question added successfully');
                     });
               });
         })
      .then((result) => {return result})
      .catch((error) => {return error})
};


const getQuestions = (quizId) => {
  return new Promise((resolve, reject) => {
    db.query(
        `
        SELECT *
        FROM quiz_question
        JOIN Question
        ON quiz_question.question_id = Question.id
        JOIN Quiz
        ON quiz_question.quiz_id = Quiz.id
        WHERE quiz_id = ?
        `,
        [quizId], (error, results) => {
          if (error) {
            return reject(error);
          }

          const questions = {
              // question_id: results[0].question_id,
              // question_text: results[0].text,
              // question_type: results[0].type,
              // id_ans: results[0].id_ans
          };
          var q = 1;
          results.forEach((result) => {
            questions[`Q${q++}`] = {
              questionId: result.question_id,
              questionText: result.text,
              questionType: result.type,
              idAns: result.id_ans
            };
          });
          const ret = {
            quizId: quizId,
            quizTitle: results[0].title,
            difficulty: results[0].difficulty,
            startTime: results[0].start_time,
            endTime: results[0].end_time,
            questionsLength: results.length,
            questions: questions
          };

          resolve(ret);
        });
  });
};

// const getQuiz = (quizId) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//         'SELECT * FROM Quiz WHERE subject_id = ?', [subjectId],
//         (error, results) => {
//           if (error) {
//             return reject(error);
//           }
//           resolve(results);
//         });
//   });
// };
module.exports = {
  addQuestion,
  getQuestions
  // , getStudents
}