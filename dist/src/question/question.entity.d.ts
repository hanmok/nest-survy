import { QuestionType } from 'src/util/QuestionType';
export declare class Question {
    id: number;
    position: number;
    survey_id: number;
    text: string;
    expected_time_in_sec: number;
    section_id: number;
    required: number;
    question_type: QuestionType;
}
