export class AnswerPair {
  question_id: number;
  answer_text: string;

  constructor(question_id: number, answer_text: string) {
    this.question_id = question_id;
    this.answer_text = answer_text;
  }
}
