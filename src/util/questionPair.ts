export class QuestionPair {
  question_id: number;
  question_text: string;
  constructor(question_id: number, question_text: string) {
    this.question_id = question_id;
    this.question_text = question_text;
  }
}
