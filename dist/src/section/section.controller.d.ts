import { SectionService } from './section.service';
import { CreateSectionDTO } from './createSection.dto';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';
export declare class SectionController {
    private sectionService;
    private sectionBridgeService;
    constructor(sectionService: SectionService, sectionBridgeService: SectionBridgeService);
    getAllSection(): Promise<import("../util/api-response.model").CustomApiResponse<import("./section.entity").Section[]>>;
    createSection(body: CreateSectionDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./section.entity").Section>>;
    getSectionById(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("./section.entity").Section>>;
    getNextSectionId(current_id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../section-bridge/section-bridge.entity").SectionBridge>>;
    getQuestionsUsingSectionId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../question/question.entity").Question[]>>;
    getSelectableOptionsUsingSectionId(id: string): Promise<import("../util/api-response.model").CustomApiResponse<import("../selectable-option/selectable-option.entity").SelectableOption[]>>;
}
