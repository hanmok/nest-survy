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
exports.ParticipatingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const participating_entity_1 = require("./participating.entity");
const typeorm_2 = require("typeorm");
let ParticipatingService = exports.ParticipatingService = class ParticipatingService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(survey_id, user_id, section_id) {
        const participating = this.repo.create({ survey_id, user_id, section_id });
        return await this.repo.save(participating);
    }
    async getParticipatedUsersBySurveyId(survey_id) {
        const participatings = await this.repo.find({ where: { survey_id } });
        return participatings.map((participating) => participating.user_id);
    }
    async getParticipatedSurveysByUserId(user_id) {
        const participatings = await this.repo.find({ where: { user_id } });
        return participatings.map((participating) => participating.survey_id);
    }
};
exports.ParticipatingService = ParticipatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participating_entity_1.Participating)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParticipatingService);
//# sourceMappingURL=participating.service.js.map