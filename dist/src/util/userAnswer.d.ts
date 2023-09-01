import { AnswerPair } from './AnswerPair';
export declare class UserAnswer {
    user_id: number;
    answerPairs: AnswerPair[];
    constructor(user_id: number, answerPairs: AnswerPair[]);
}
