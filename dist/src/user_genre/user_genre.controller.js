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
exports.UserGenreController = void 0;
const common_1 = require("@nestjs/common");
const user_genre_service_1 = require("./user_genre.service");
const userGenre_dto_1 = require("./userGenre.dto");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let UserGenreController = exports.UserGenreController = class UserGenreController {
    constructor(userGenreService) {
        this.userGenreService = userGenreService;
    }
    async create(body) {
        const ret = await this.userGenreService.create(body.user_id, body.genre_id);
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create User_genre' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userGenre_dto_1.UserGenreDTO]),
    __metadata("design:returntype", Promise)
], UserGenreController.prototype, "create", null);
exports.UserGenreController = UserGenreController = __decorate([
    (0, swagger_1.ApiTags)('UserGenre'),
    (0, common_1.Controller)('user-genre'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [user_genre_service_1.UserGenreService])
], UserGenreController);
//# sourceMappingURL=user_genre.controller.js.map