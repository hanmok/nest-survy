import { CustomAnswerService } from './custom_answer.service';
import { CreateCustomAnswerDto } from './createCustomAnswer.dto';
export declare class CustomAnswerController {
    private customAnswerService;
    constructor(customAnswerService: CustomAnswerService);
    createCustomAnswer(body: CreateCustomAnswerDto): Promise<import("../util/api-response.model").CustomApiResponse<import("./custom_answer.entity").CustomAnswer>>;
    getAllCustomAnswer(): Promise<import("./custom_answer.entity").CustomAnswer[]>;
}
