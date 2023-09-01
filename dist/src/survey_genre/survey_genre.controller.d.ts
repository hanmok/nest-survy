import { SurveyGenreService } from './survey_genre.service';
import { SurveyGenreDTO } from './survey_genre.dto';
export declare class SurveyGenreController {
    private surveyGenreService;
    constructor(surveyGenreService: SurveyGenreService);
    fetchAll(): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey_genre.entity").SurveyGenre[]>>;
    create(body: SurveyGenreDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey_genre.entity").SurveyGenre>>;
}
