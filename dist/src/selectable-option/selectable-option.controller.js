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
exports.SelectableOptionController = void 0;
const common_1 = require("@nestjs/common");
const selectable_option_service_1 = require("./selectable-option.service");
const createSelectableOption_dto_1 = require("./createSelectableOption.dto");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let SelectableOptionController = exports.SelectableOptionController = class SelectableOptionController {
    constructor(selectableOptionService) {
        this.selectableOptionService = selectableOptionService;
    }
    async getAllSelectableOptions() {
        const ret = await this.selectableOptionService.adminFindAll();
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async createSelectableOption(body) {
        const ret = await this.selectableOptionService.create(body);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all selectable-options' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SelectableOptionController.prototype, "getAllSelectableOptions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create selectable-option' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSelectableOption_dto_1.CreateSelectableOptionDTO]),
    __metadata("design:returntype", Promise)
], SelectableOptionController.prototype, "createSelectableOption", null);
exports.SelectableOptionController = SelectableOptionController = __decorate([
    (0, swagger_1.ApiTags)('SelectableOption'),
    (0, common_1.Controller)('selectable-option'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [selectable_option_service_1.SelectableOptionService])
], SelectableOptionController);
//# sourceMappingURL=selectable-option.controller.js.map