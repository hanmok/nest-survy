import { CreateCustomAnswerDto } from './createCustomAnswer.dto';
import { CreateAnswerDTO } from './../answer/createAnswer.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomAnswer } from './custom_answer.entity';

@Injectable()
export class CustomAnswerService {
  constructor(
    @InjectRepository(CustomAnswer) private repo: Repository<CustomAnswer>,
  ) {}

  async create(customAnswerDto: CreateCustomAnswerDto) {
    const customAnswer = this.repo.create(customAnswerDto);
    return await this.repo.save(customAnswer);
  }

  async getAll() {
    const allCustomAnswers = await this.repo.find();
    return allCustomAnswers;
  }
}
