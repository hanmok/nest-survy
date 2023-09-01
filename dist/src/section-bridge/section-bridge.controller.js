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
exports.SectionBridgeController = void 0;
const common_1 = require("@nestjs/common");
const section_bridge_service_1 = require("./section-bridge.service");
const SectionBridge_dto_1 = require("./SectionBridge.dto");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let SectionBridgeController = exports.SectionBridgeController = class SectionBridgeController {
    constructor(sectionBridgeService) {
        this.sectionBridgeService = sectionBridgeService;
    }
    async create(body) {
        const ret = await this.sectionBridgeService.create(body);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create SectionBridge' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SectionBridge_dto_1.SectionBridgeDTO]),
    __metadata("design:returntype", Promise)
], SectionBridgeController.prototype, "create", null);
exports.SectionBridgeController = SectionBridgeController = __decorate([
    (0, swagger_1.ApiTags)('SectionBridge'),
    (0, common_1.Controller)('section-bridge'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [section_bridge_service_1.SectionBridgeService])
], SectionBridgeController);
//# sourceMappingURL=section-bridge.controller.js.map