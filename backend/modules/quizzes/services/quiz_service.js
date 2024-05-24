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
                 resolve('quiz added successfully');
               });
         })
      .then((result) => {return result})
      .catch((error) => {return error})
};


const getQuizzes = (subjectId) => {
  return new Promise((resolve, reject) => {
    db.query(
        'SELECT * FROM Quiz WHERE subject_id = ?', [subjectId],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
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
  addQuiz,
  getQuizzes
  // , getStudents
}