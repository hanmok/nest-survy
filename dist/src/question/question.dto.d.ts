import { QuestionType } from 'src/util/QuestionType';
export declare class QuestionDTO {
    id: number;
    section_id: number;
    survey_id: number;
    position: number;
    text: string;
    expected_time_in_sec: number;
    required: number;
    question_type: QuestionType;
}
