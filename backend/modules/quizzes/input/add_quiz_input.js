class addQuizInput {
  constructor(quizId, subjectId, title, start_time, end_time) {
    this.quizId = quizId;
    this.subjectId = subjectId;
    this.title = title;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}
module.exports = {addQuizInput}