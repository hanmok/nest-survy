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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("./survey.entity");
const typeorm_2 = require("typeorm");
const createRandomAlphabets_1 = require("../util/createRandomAlphabets");
const survey_dto_1 = require("./survey.dto");
const class_transformer_1 = require("class-transformer");
const randomString = require('randomstring');
let SurveyService = exports.SurveyService = class SurveyService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        const surveyEntities = await this.repo.find();
        const surveys = (0, class_transformer_1.plainToInstance)(survey_dto_1.SurveyDto, surveyEntities, {});
        return surveys;
    }
    async getAvailableSurveys(availableOnly) {
        let surveyEntities;
        if (availableOnly) {
            surveyEntities = await this.repo.find({ where: { is_completed: 0 } });
        }
        surveyEntities = await this.repo.find();
        return surveyEntities;
        const surveys = (0, class_transformer_1.plainToInstance)(survey_dto_1.SurveyDto, surveyEntities, {});
        return surveys;
    }
    async findOne(id) {
        if (!id) {
            return null;
        }
        return await this.repo.findOneBy({ id });
    }
    async create(title, participationGoal) {
        const survey = this.repo.create({
            title,
            participation_goal: participationGoal,
        });
        const randomAlphabets = (0, createRandomAlphabets_1.createRandomAlphabets)(7);
        survey.code = randomAlphabets;
        return await this.repo.save(survey);
    }
    async increaseParticipatedNumber(id) {
        const survey = await this.repo.findOne({ where: { id } });
        survey.current_participation += 1;
        if (survey.current_participation >= survey.participation_goal) {
            survey.is_completed = 1;
        }
        return await this.repo.save(survey);
    }
    async addInitialSectionId(survey_id, section_id) {
        const survey = await this.repo.findOne({ where: { id: survey_id } });
        survey.initial_section_id = section_id;
        return await this.repo.save(survey);
    }
};
exports.SurveyService = SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyService);
//# sourceMappingURL=survey.service.js.map