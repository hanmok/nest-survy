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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const section_service_1 = require("./section.service");
const createSection_dto_1 = require("./createSection.dto");
const section_bridge_service_1 = require("../section-bridge/section-bridge.service");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let SectionController = exports.SectionController = class SectionController {
    constructor(sectionService, sectionBridgeService) {
        this.sectionService = sectionService;
        this.sectionBridgeService = sectionBridgeService;
    }
    async getAllSection() {
        const ret = await this.sectionService.getAllSections();
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async createSection(body) {
        const ret = await this.sectionService.createSection(body);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
    async getSectionById(id) {
        const ret = await this.sectionService.findSection(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getNextSectionId(current_id) {
        const ret = await this.sectionBridgeService.getByCurrentId(parseInt(current_id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getQuestionsUsingSectionId(id) {
        const ret = await this.sectionService.findQuestionsBySectionId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getSelectableOptionsUsingSectionId(id) {
        const ret = await this.sectionService.findSelectableOptionsBySectionId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get All sections, 'ADMIN' " }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getAllSection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Section' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSection_dto_1.CreateSectionDTO]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "createSection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get section by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSectionById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get next section by current section id' }),
    (0, common_1.Get)('/:current_id/next'),
    __param(0, (0, common_1.Param)('current_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getNextSectionId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions by section id' }),
    (0, common_1.Get)('/:id/questions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getQuestionsUsingSectionId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all selectable-option by section id' }),
    (0, common_1.Get)('/:id/selectable-options'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSelectableOptionsUsingSectionId", null);
exports.SectionController = SectionController = __decorate([
    (0, swagger_1.ApiTags)('Section'),
    (0, common_1.Controller)('/section'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [section_service_1.SectionService,
        section_bridge_service_1.SectionBridgeService])
], SectionController);
//# sourceMappingURL=section.controller.js.map