import { GenreService } from './genre.service';
import { CreateGenreDTO } from './createGenre.dto';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
export declare class GenreController {
    private genreService;
    private surveyGenreService;
    constructor(genreService: GenreService, surveyGenreService: SurveyGenreService);
    getAllGenres(): Promise<import("../util/api-response.model").CustomApiResponse<import("./genre.entity").Genre[]>>;
    createGenre(body: CreateGenreDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./genre.entity").Genre>>;
    getGenreById(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./genre.entity").Genre>>;
    getSurveysByGenreId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../survey_genre/survey_genre.entity").SurveyGenre[]>>;
}
