import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { Answer } from 'src/answer/answer.entity';
import { ValidateQuestionTypePipe } from './validate-question-type.pipe';
export declare class QuestionService {
    private repo;
    private selectableOptionRepo;
    private answerRepo;
    private readonly questionTypeValidationPipe;
    constructor(repo: Repository<Question>, selectableOptionRepo: Repository<SelectableOption>, answerRepo: Repository<Answer>, questionTypeValidationPipe: ValidateQuestionTypePipe);
    getAll(): Promise<Question[]>;
    create(questionDTO: CreateQuestionDTO): Promise<Question>;
    findById(id: number): Promise<Question>;
    findBySurveyId(survey_id: number): Promise<Question[]>;
    getSelectableOptionsByCurrentId(question_id: number): Promise<SelectableOption[]>;
    getAnswersByQuestionId(question_id: number): Promise<Answer[]>;
}
