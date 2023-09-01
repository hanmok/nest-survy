import { QuestionService } from './../question/question.service';
import { SurveyDto } from './survey.dto';
import { SurveyService } from './survey.service';
import { CreateSurveyDTO } from './createSurvey.dto';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { SectionService } from 'src/section/section.service';
export declare class SurveyController {
    private sectionService;
    private surveyService;
    private surveyGenreService;
    private postingService;
    private participatingService;
    private transactionService;
    private questionService;
    constructor(sectionService: SectionService, surveyService: SurveyService, surveyGenreService: SurveyGenreService, postingService: PostingService, participatingService: ParticipatingService, transactionService: TransactionService, questionService: QuestionService);
    create(body: CreateSurveyDTO): Promise<import("../util/api-response.model").CustomApiResponse<void>>;
    getAllSurveys(): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey.entity").Survey[] | SurveyDto[]>>;
    getSectionsBySurveyId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<Promise<import("../section/section.entity").Section[]>>>;
    getQuestionsBySurveyId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../question/question.entity").Question[]>>;
    getAvailableSurveys(): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey.entity").Survey[] | SurveyDto[]>>;
    getSurveyById(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey.entity").Survey>>;
    getParticipatedUsersBySurveyId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<number[]>>;
    getGenresBySurveyId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../survey_genre/survey_genre.entity").SurveyGenre[]>>;
    increateParticipatedUsers(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey.entity").Survey>>;
    addInitialSectionId(id: string, section_id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./survey.entity").Survey>>;
}
