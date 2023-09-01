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
exports.ParticipatingController = void 0;
const common_1 = require("@nestjs/common");
const participating_service_1 = require("./participating.service");
const swagger_1 = require("@nestjs/swagger");
const participating_dto_1 = require("./participating.dto");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let ParticipatingController = exports.ParticipatingController = class ParticipatingController {
    constructor(participatingService) {
        this.participatingService = participatingService;
    }
    async createParticipating(body) {
        const participating = await this.participatingService.create(body.survey_id, body.user_id, body.section_id);
        return (0, success_api_response_1.SuccessAPIResponse)(participating, 201);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Participating' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participating_dto_1.ParticipatingDTO]),
    __metadata("design:returntype", Promise)
], ParticipatingController.prototype, "createParticipating", null);
exports.ParticipatingController = ParticipatingController = __decorate([
    (0, swagger_1.ApiTags)('Participating'),
    (0, common_1.Controller)('participating'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [participating_service_1.ParticipatingService])
], ParticipatingController);
//# sourceMappingURL=participating.controller.js.map