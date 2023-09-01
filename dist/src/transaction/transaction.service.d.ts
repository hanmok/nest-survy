import { Survey } from 'src/survey/survey.entity';
import { Repository, DataSource } from 'typeorm';
import { Posting } from 'src/posting/posting.entity';
export declare class TransactionService {
    private surveyRepo;
    private postingRepo;
    private dataSource;
    constructor(surveyRepo: Repository<Survey>, postingRepo: Repository<Posting>, dataSource: DataSource);
    createSurvey(title: string, participationGoal: number, user_id: number): Promise<void>;
}
