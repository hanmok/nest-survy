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
exports.SurveyController = void 0;
const question_service_1 = require("./../question/question.service");
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const createSurvey_dto_1 = require("./createSurvey.dto");
const survey_genre_service_1 = require("../survey_genre/survey_genre.service");
const posting_service_1 = require("../posting/posting.service");
const participating_service_1 = require("../participating/participating.service");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const transaction_service_1 = require("../transaction/transaction.service");
const section_service_1 = require("../section/section.service");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let SurveyController = exports.SurveyController = class SurveyController {
    constructor(sectionService, surveyService, surveyGenreService, postingService, participatingService, transactionService, questionService) {
        this.sectionService = sectionService;
        this.surveyService = surveyService;
        this.surveyGenreService = surveyGenreService;
        this.postingService = postingService;
        this.participatingService = participatingService;
        this.transactionService = transactionService;
        this.questionService = questionService;
    }
    async create(body) {
        const ret = await this.transactionService.createSurvey(body.title, body.participation_goal, body.user_id);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
    async getAllSurveys() {
        const ret = await this.surveyService.getAvailableSurveys(false);
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getSectionsBySurveyId(id) {
        const ret = this.sectionService.findSectionBySurveyId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getQuestionsBySurveyId(id) {
        const ret = await this.questionService.findBySurveyId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getAvailableSurveys() {
        const ret = await this.surveyService.getAvailableSurveys(true);
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getSurveyById(id) {
        const survey = await this.surveyService.findOne(parseInt(id));
        if (!survey) {
            throw new common_1.NotFoundException('survey not found');
        }
        return (0, success_api_response_1.SuccessAPIResponse)(survey);
    }
    async getParticipatedUsersBySurveyId(id) {
        const ret = await this.participatingService.getParticipatedUsersBySurveyId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getGenresBySurveyId(id) {
        const ret = await this.surveyGenreService.getGenresBySurveyId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async increateParticipatedUsers(id) {
        const ret = await this.surveyService.increaseParticipatedNumber(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async addInitialSectionId(id, section_id) {
        const ret = await this.surveyService.addInitialSectionId(parseInt(id), parseInt(section_id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create survey' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSurvey_dto_1.CreateSurveyDTO]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all surveys, 'ADMIN'" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getAllSurveys", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all sections by survey id' }),
    (0, common_1.Get)('/:id/sections'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSectionsBySurveyId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions by survey id' }),
    (0, common_1.Get)('/:id/questions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getQuestionsBySurveyId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get available surveys only' }),
    (0, common_1.Get)('/available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getAvailableSurveys", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get survey by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSurveyById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get participated-users by survey id' }),
    (0, common_1.Get)('/:id/participated-users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getParticipatedUsersBySurveyId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all related genre ids by survey id' }),
    (0, common_1.Get)('/:id/genres'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getGenresBySurveyId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Increase the number of participated-user by 1' }),
    (0, common_1.Patch)('/:id/increase-participation'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "increateParticipatedUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'add initial section id' }),
    (0, common_1.Patch)('/:id/add-initial-section/:section_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "addInitialSectionId", null);
exports.SurveyController = SurveyController = __decorate([
    (0, swagger_1.ApiTags)('Survey'),
    (0, common_1.Controller)('/survey'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [section_service_1.SectionService,
        survey_service_1.SurveyService,
        survey_genre_service_1.SurveyGenreService,
        posting_service_1.PostingService,
        participating_service_1.ParticipatingService,
        transaction_service_1.TransactionService,
        question_service_1.QuestionService])
], SurveyController);
//# sourceMappingURL=survey.controller.js.map