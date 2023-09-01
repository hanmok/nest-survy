import { SelectableOptionService } from './../selectable-option/selectable-option.service';
import { QuestionService } from 'src/question/question.service';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './createAnswer.dto';
import { MatchedAnswer } from 'src/util/matchedAnswer';
import { ParticipatingService } from 'src/participating/participating.service';
import { UserAnswer } from 'src/util/userAnswer';
import { QuestionPair } from 'src/util/questionPair';
export declare class AnswerService {
    private answerRepo;
    private questionService;
    private selectableOptionService;
    private participatingService;
    constructor(answerRepo: Repository<Answer>, questionService: QuestionService, selectableOptionService: SelectableOptionService, participatingService: ParticipatingService);
    getAll(): Promise<Answer[]>;
    createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<Answer>;
    getAnswersByUserId(user_id: number, survey_id: number): Promise<MatchedAnswer[]>;
    getAnswerBySurveyId(survey_id: number): Promise<{
        questionPairs: QuestionPair[];
        userAnswers: UserAnswer[];
    }>;
}
