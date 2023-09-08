import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { Answer } from '../answer/answer.entity';
import { QuestionType } from '../util/QuestionType';
import { ValidateQuestionTypePipe } from './validate-question-type.pipe';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private repo: Repository<Question>,
    @InjectRepository(SelectableOption)
    private selectableOptionRepo: Repository<SelectableOption>,
    @InjectRepository(Answer) private answerRepo: Repository<Answer>,
    private readonly questionTypeValidationPipe: ValidateQuestionTypePipe,
  ) {}

  async getAll() {
    return await this.repo.find();
  }

  async create(questionDTO: CreateQuestionDTO) {
    const question = this.repo.create(questionDTO);
    return await this.repo.save(question);
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findBySurveyId(survey_id: number) {
    // return await this.repo.find({ where: { survey_id } });
    const questions = await this.repo.find({ where: { survey_id } });
    console.log(`questions: ${questions}, number: ${questions.length}`);
    return questions;
  }

  async getSelectableOptionsByCurrentId(question_id: number) {
    return await this.selectableOptionRepo.find({ where: { question_id } });
  }

  async getAnswersByQuestionId(question_id: number) {
    return await this.answerRepo.find({ where: { question_id } });
  }
}
