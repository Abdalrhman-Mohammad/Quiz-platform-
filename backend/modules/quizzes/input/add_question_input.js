class addQuestionInput {
  constructor(questionId, text, type, id_ans=NULL) {
    this.id = questionId;
    this.text = text;
    this.type = type;
    this.id_ans = id_ans
  }
}
module.exports = {addQuestionInput}