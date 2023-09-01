import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { SurveyDto } from './survey.dto';
export declare class SurveyService {
    private repo;
    constructor(repo: Repository<Survey>);
    getAll(): Promise<SurveyDto[]>;
    getAvailableSurveys(availableOnly: boolean): Promise<Survey[] | SurveyDto[]>;
    findOne(id: number): Promise<Survey>;
    create(title: string, participationGoal: number): Promise<Survey>;
    increaseParticipatedNumber(id: any): Promise<Survey>;
    addInitialSectionId(survey_id: any, section_id: any): Promise<Survey>;
}
