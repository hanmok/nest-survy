import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDTO } from './createSection.dto';
import { Question } from 'src/question/question.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
export declare class SectionService {
    private repo;
    private questionRepo;
    private selectableOptionRepo;
    constructor(repo: Repository<Section>, questionRepo: Repository<Question>, selectableOptionRepo: Repository<SelectableOption>);
    getAllSections(): Promise<Section[]>;
    createSection(body: CreateSectionDTO): Promise<Section>;
    findSection(id: number): Promise<Section>;
    findSectionBySurveyId(id: number): Promise<Section[]>;
    findQuestionsBySectionId(section_id: number): Promise<Question[]>;
    findSelectableOptionsBySectionId(section_id: number): Promise<SelectableOption[]>;
}
