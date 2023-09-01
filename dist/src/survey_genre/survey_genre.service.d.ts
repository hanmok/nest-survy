import { SurveyGenre } from './survey_genre.entity';
import { Repository } from 'typeorm';
export declare class SurveyGenreService {
    private repo;
    constructor(repo: Repository<SurveyGenre>);
    getAllSurveyGenres(): Promise<SurveyGenre[]>;
    getSurveysByGenreId(genre_id: any): Promise<SurveyGenre[]>;
    getGenresBySurveyId(survey_id: any): Promise<SurveyGenre[]>;
    create(survey_id: any, genre_id: any): Promise<SurveyGenre>;
}
