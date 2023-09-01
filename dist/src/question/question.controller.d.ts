import { QuestionService } from './question.service';
import { CreateQuestionDTO } from './createQuestion.dto';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(): Promise<import("../util/api-response.model").CustomApiResponse<import("./question.entity").Question[]>>;
    create(body: CreateQuestionDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./question.entity").Question>>;
    getQuestionById(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./question.entity").Question>>;
    getSelectableOptionsByQuestionId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../selectable-option/selectable-option.entity").SelectableOption[]>>;
    getAnswersByQuestionId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../answer/answer.entity").Answer[]>>;
}
