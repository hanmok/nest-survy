export class QuestionPair {
  question_id: number;
  question_text: string;
  section_id: number;
  constructor(question_id: number, question_text: string, section_id: number) {
    this.question_id = question_id;
    this.question_text = question_text;
    this.section_id = section_id;
  }
}
