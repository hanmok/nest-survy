import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDTO } from './createSection.dto';
import { Question } from 'src/question/question.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private repo: Repository<Section>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(SelectableOption)
    private selectableOptionRepo: Repository<SelectableOption>,
  ) {}

  async getAllSections() {
    return await this.repo.find();
  }

  async createSection(body: CreateSectionDTO) {
    const section = await this.repo.create(body);
    return await this.repo.save(section);
  }

  async findSection(id: number) {
    const section = await this.repo.findOneBy({ id });
    return section;
  }

  async findSectionBySurveyId(id: number) {
    const sections = await this.repo.find({ where: { survey_id: id } });
    return sections;
  }

  async findQuestionsBySectionId(section_id: number) {
    return await this.questionRepo.find({ where: { section_id } });
  }

  async findSelectableOptionsBySectionId(section_id: number) {
    return await this.selectableOptionRepo.find({ where: { section_id } });
  }
}
