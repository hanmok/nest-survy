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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_service_1 = require("./genre.service");
const createGenre_dto_1 = require("./createGenre.dto");
const survey_genre_service_1 = require("../survey_genre/survey_genre.service");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let GenreController = exports.GenreController = class GenreController {
    constructor(genreService, surveyGenreService) {
        this.genreService = genreService;
        this.surveyGenreService = surveyGenreService;
    }
    async getAllGenres() {
        const ret = await this.genreService.getAll();
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async createGenre(body) {
        console.log(body);
        const genre = await this.genreService.create(body.name);
        return (0, success_api_response_1.SuccessAPIResponse)(genre, 201);
    }
    async getGenreById(id) {
        const genre = await this.genreService.findOne(parseInt(id));
        if (!genre) {
            throw new common_1.NotFoundException('genre not found');
        }
        return (0, success_api_response_1.SuccessAPIResponse)(genre);
    }
    async getSurveysByGenreId(id) {
        const surveyGenres = await this.surveyGenreService.getSurveysByGenreId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(surveyGenres);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All genres' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getAllGenres", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create genre, 'ADMIN'" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createGenre_dto_1.CreateGenreDTO]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "createGenre", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Genre with id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getGenreById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All surveys having the genre ' }),
    (0, common_1.Get)('/:id/surveys'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getSurveysByGenreId", null);
exports.GenreController = GenreController = __decorate([
    (0, swagger_1.ApiTags)('Genre'),
    (0, common_1.Controller)('/genre'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [genre_service_1.GenreService,
        survey_genre_service_1.SurveyGenreService])
], GenreController);
//# sourceMappingURL=genre.controller.js.map