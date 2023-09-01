import { Repository } from 'typeorm';
import { Posting } from './posting.entity';
export declare class PostingService {
    private repo;
    constructor(repo: Repository<Posting>);
    create(survey_id: number, user_id: number): Promise<Posting>;
    getPostedSurveysByUserId(user_id: any): Promise<Posting[]>;
    getAll(): Promise<Posting[]>;
}
