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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const createQuestion_dto_1 = require("./createQuestion.dto");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const validate_question_type_pipe_1 = require("./validate-question-type.pipe");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let QuestionController = exports.QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getAllQuestions() {
        const ret = await this.questionService.getAll();
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async create(body) {
        const question = await this.questionService.create(body);
        return (0, success_api_response_1.SuccessAPIResponse)(question, 201);
    }
    async getQuestionById(id) {
        const ret = await this.questionService.findById(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getSelectableOptionsByQuestionId(id) {
        const ret = await this.questionService.getSelectableOptionsByCurrentId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getAnswersByQuestionId(id) {
        const ret = await this.questionService.getAnswersByQuestionId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Questions' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Question' }),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(validate_question_type_pipe_1.ValidateQuestionTypePipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuestion_dto_1.CreateQuestionDTO]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Question by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestionById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Selectable options by question id' }),
    (0, common_1.Get)(':id/selectable-options'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getSelectableOptionsByQuestionId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all answers by question id' }),
    (0, common_1.Get)('/:id/answers'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAnswersByQuestionId", null);
exports.QuestionController = QuestionController = __decorate([
    (0, swagger_1.ApiTags)('Question'),
    (0, common_1.Controller)('question'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map