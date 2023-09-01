import { AnswerService } from './answer.service';
import { CreateAnswerDTO } from './createAnswer.dto';
export declare class AnswerController {
    private answerService;
    constructor(answerService: AnswerService);
    createAnswer(body: CreateAnswerDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./answer.entity").Answer>>;
    getAnswers(survey_id: number): Promise<{
        questionPairs: import("../util/questionPair").QuestionPair[];
        userAnswers: import("../util/userAnswer").UserAnswer[];
    }>;
}
