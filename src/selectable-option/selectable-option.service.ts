import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectableOption } from './selectable-option.entity';
import { Repository } from 'typeorm';
import { SelectableOptionDTO } from './selectable-option.dto';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';

@Injectable()
export class SelectableOptionService {
  constructor(
    @InjectRepository(SelectableOption)
    private repo: Repository<SelectableOption>,
  ) {}

  async create(selectableOptionDTO: CreateSelectableOptionDTO) {
    const selectableOption = this.repo.create(selectableOptionDTO);
    return await this.repo.save(selectableOption);
  }

  async findByQuestionId(question_id) {
    return await this.repo.find({ where: { question_id } });
  }

  // admin
  async adminFindAll() {
    return await this.repo.find();
  }
}
