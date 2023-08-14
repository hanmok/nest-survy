import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './createAnswer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectRepository(Answer) private repo: Repository<Answer>) {}

  async getAll() {
    return await this.repo.find();
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = this.repo.create(createAnswerDTO);
    return await this.repo.save(answer);
  }
}
