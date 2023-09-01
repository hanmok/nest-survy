import { CreateCustomAnswerDto } from './createCustomAnswer.dto';
import { Repository } from 'typeorm';
import { CustomAnswer } from './custom_answer.entity';
export declare class CustomAnswerService {
    private repo;
    constructor(repo: Repository<CustomAnswer>);
    create(customAnswerDto: CreateCustomAnswerDto): Promise<CustomAnswer>;
    getAll(): Promise<CustomAnswer[]>;
}
