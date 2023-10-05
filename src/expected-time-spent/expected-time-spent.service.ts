import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpectedTimeSpent } from './ExpectedTimeSpent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpectedTimeSpentService {
  constructor(
    @InjectRepository(ExpectedTimeSpent)
    private repo: Repository<ExpectedTimeSpent>,
  ) {}

  async getAll() {
    return await this.repo.find();
  }
}
