import { AnswerPair } from './answerPair';

export class UserAnswer {
  user_id: number;
  answerPairs: AnswerPair[];
  constructor(user_id: number, answerPairs: AnswerPair[]) {
    this.user_id = user_id;
    this.answerPairs = answerPairs;
  }
}
