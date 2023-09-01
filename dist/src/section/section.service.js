"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const section_entity_1 = require("./section.entity");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("../question/question.entity");
const selectable_option_entity_1 = require("../selectable-option/selectable-option.entity");
let SectionService = exports.SectionService = class SectionService {
    constructor(repo, questionRepo, selectableOptionRepo) {
        this.repo = repo;
        this.questionRepo = questionRepo;
        this.selectableOptionRepo = selectableOptionRepo;
    }
    async getAllSections() {
        return await this.repo.find();
    }
    async createSection(body) {
        const section = await this.repo.create(body);
        return await this.repo.save(section);
    }
    async findSection(id) {
        const section = await this.repo.findOneBy({ id });
        return section;
    }
    async findSectionBySurveyId(id) {
        const sections = await this.repo.find({ where: { survey_id: id } });
        return sections;
    }
    async findQuestionsBySectionId(section_id) {
        return await this.questionRepo.find({ where: { section_id } });
    }
    async findSelectableOptionsBySectionId(section_id) {
        return await this.selectableOptionRepo.find({ where: { section_id } });
    }
};
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, typeorm_1.InjectRepository)(selectable_option_entity_1.SelectableOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SectionService);
//# sourceMappingURL=section.service.js.map