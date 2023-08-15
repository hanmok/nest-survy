export class MatchedAnswer {
  question_id: number;
  question_text: string;
  answer_text: string;
  constructor(question_id: number, question_text: string, answer_text: string) {
    this.question_id = question_id;
    this.question_text = question_text;
    this.answer_text = answer_text;
  }
}
