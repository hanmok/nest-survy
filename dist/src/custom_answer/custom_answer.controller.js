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
exports.CustomAnswerController = void 0;
const common_1 = require("@nestjs/common");
const custom_answer_service_1 = require("./custom_answer.service");
const common_2 = require("@nestjs/common");
const success_api_response_1 = require("../util/success-api-response");
const swagger_1 = require("@nestjs/swagger");
const createCustomAnswer_dto_1 = require("./createCustomAnswer.dto");
let CustomAnswerController = exports.CustomAnswerController = class CustomAnswerController {
    constructor(customAnswerService) {
        this.customAnswerService = customAnswerService;
    }
    async createCustomAnswer(body) {
        const ret = await this.customAnswerService.create(body);
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getAllCustomAnswer() {
        const ret = await this.customAnswerService.getAll();
        return ret;
    }
};
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCustomAnswer_dto_1.CreateCustomAnswerDto]),
    __metadata("design:returntype", Promise)
], CustomAnswerController.prototype, "createCustomAnswer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomAnswerController.prototype, "getAllCustomAnswer", null);
exports.CustomAnswerController = CustomAnswerController = __decorate([
    (0, swagger_1.ApiTags)('CustomAnswer'),
    (0, common_1.Controller)('/custom-answer'),
    __metadata("design:paramtypes", [custom_answer_service_1.CustomAnswerService])
], CustomAnswerController);
//# sourceMappingURL=custom_answer.controller.js.map