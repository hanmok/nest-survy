import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { Answer } from 'src/answer/answer.entity';
import { QuestionType } from 'src/util/QuestionType';
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

  async getSelectableOptionsByCurrentId(question_id: number) {
    return await this.selectableOptionRepo.find({ where: { question_id } });
  }

  async getAnswersByQuestionId(question_id: number) {
    return await this.answerRepo.find({ where: { question_id } });
  }
}
