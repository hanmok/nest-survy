import { SelectableOption } from './selectable-option.entity';
import { Repository } from 'typeorm';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';
export declare class SelectableOptionService {
    private repo;
    constructor(repo: Repository<SelectableOption>);
    create(selectableOptionDTO: CreateSelectableOptionDTO): Promise<SelectableOption>;
    findByIds(ids: number[]): Promise<SelectableOption[]>;
    findByQuestionId(question_id: any): Promise<SelectableOption[]>;
    adminFindAll(): Promise<SelectableOption[]>;
}
