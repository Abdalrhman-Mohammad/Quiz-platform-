class addQuizInput {
  constructor(quizId, subjectId, title, start_time, end_time, questions) {
    this.quizId = quizId;
    this.subjectId = subjectId;
    this.title = title;
    this.start_time = start_time;
    this.end_time = end_time;
    this.questions = questions
  }
}
class addQuestionInput {
  constructor(questionId, type, text, id_ans, answers, correct_answer) {
    this.questionId = questionId;
    this.type = type;
    this.text = text;
    this.id_ans = id_ans;
    this.answers = answers;
    this.correct_answer = correct_answer
  }
}
class addAnswerInput {
  constructor(answerId, content) {
    this.answerId = answerId;
    this.content = content;
  }
}
module.exports = {
  addQuizInput,
  addQuestionInput,
  addAnswerInput,
}