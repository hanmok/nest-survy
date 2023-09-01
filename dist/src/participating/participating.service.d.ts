import { Participating } from './participating.entity';
import { Repository } from 'typeorm';
export declare class ParticipatingService {
    private repo;
    constructor(repo: Repository<Participating>);
    create(survey_id: number, user_id: number, section_id: number): Promise<Participating>;
    getParticipatedUsersBySurveyId(survey_id: number): Promise<number[]>;
    getParticipatedSurveysByUserId(user_id: number): Promise<number[]>;
}
