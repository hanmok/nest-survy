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
  ) {}

  async getAll() {
    return await this.repo.find();
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = this.repo.create(createAnswerDTO);
    return await this.repo.save(answer);
  }

  // transaction service 로 빼낼 수 있음.
  async getAnswers(section_id: number, user_id: number, survey_id: number) {
    // 1. 질문들 모두 가져오기. (Section Service 필요, position 에 따라 오름차순 정렬)
    const question_ids = (
      await this.sectionService.findQuestionsBySectionId(section_id)
    )
      .sort((a, b) => a.position - b.position)
      .map((question) => question.id);

    // 2. Answer 중
    const answers = await this.repo.find({ where: { survey_id, user_id } });
  }
}
