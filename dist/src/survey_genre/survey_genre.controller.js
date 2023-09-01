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
exports.SurveyGenreController = void 0;
const common_1 = require("@nestjs/common");
const survey_genre_service_1 = require("./survey_genre.service");
const survey_genre_dto_1 = require("./survey_genre.dto");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let SurveyGenreController = exports.SurveyGenreController = class SurveyGenreController {
    constructor(surveyGenreService) {
        this.surveyGenreService = surveyGenreService;
    }
    async fetchAll() {
        const ret = await this.surveyGenreService.getAllSurveyGenres();
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async create(body) {
        const ret = await this.surveyGenreService.create(body.survey_id, body.genre_id);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Survey_genre' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyGenreController.prototype, "fetchAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Survey_genre' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_genre_dto_1.SurveyGenreDTO]),
    __metadata("design:returntype", Promise)
], SurveyGenreController.prototype, "create", null);
exports.SurveyGenreController = SurveyGenreController = __decorate([
    (0, swagger_1.ApiTags)('SurveyGenre'),
    (0, common_1.Controller)('survey-genre'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [survey_genre_service_1.SurveyGenreService])
], SurveyGenreController);
//# sourceMappingURL=survey_genre.controller.js.map