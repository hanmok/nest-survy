import { SelectableOptionService } from './../selectable-option/selectable-option.service';
import { QuestionService } from 'src/question/question.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './createAnswer.dto';
import { SectionService } from 'src/section/section.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private repo: Repository<Answer>,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private selectableOptionService: SelectableOptionService,
  ) {}

  async getAll() {
    return await this.repo.find();
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = this.repo.create(createAnswerDTO);
    return await this.repo.save(answer);
  }

  // transaction service 로 빼낼 수 있음.
  //
  async getAnswers(section_id: number, user_id: number, survey_id: number) {
    // 1. 질문들 모두 가져오기. (Section Service 필요, position 에 따라 오름차순 정렬)
    // const question_ids = (
    //   await this.sectionService.findQuestionsBySectionId(section_id)
    // )
    const questions = (
      await this.questionService.findBySurveyId(survey_id)
    ).sort((a, b) => a.position - b.position);
    // .map((question) => question.id);

    // 3. 질문들 Text List 로 가져오기.
    const questionTexts = questions.map((q) => q.text);
    console.log(`questionTexts: ${questionTexts}`);

    // 2. Answer 중 survey_id, user_id 에 해당하는 것들 가져오기.
    const answers = await this.repo.find({ where: { survey_id, user_id } });
  }
}
