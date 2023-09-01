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
exports.SurveyGenreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_genre_entity_1 = require("./survey_genre.entity");
const typeorm_2 = require("typeorm");
let SurveyGenreService = exports.SurveyGenreService = class SurveyGenreService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAllSurveyGenres() {
        return await this.repo.find();
    }
    async getSurveysByGenreId(genre_id) {
        return await this.repo.find({ where: { genre_id } });
    }
    async getGenresBySurveyId(survey_id) {
        return await this.repo.find({ where: { survey_id } });
    }
    async create(survey_id, genre_id) {
        const surveyGenre = this.repo.create({ genre_id, survey_id });
        return await this.repo.save(surveyGenre);
    }
};
exports.SurveyGenreService = SurveyGenreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_genre_entity_1.SurveyGenre)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyGenreService);
//# sourceMappingURL=survey_genre.service.js.map