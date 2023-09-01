import { QuestionType } from 'src/util/QuestionType';
export declare class CreateQuestionDTO {
    section_id: number;
    survey_id: number;
    position: number;
    text: string;
    expectedTimeInSec: number;
    question_type: QuestionType;
}
