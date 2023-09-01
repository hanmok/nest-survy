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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const createUser_dto_1 = require("./dtos/createUser.dto");
const auth_service_1 = require("./auth/auth.service");
const user_genre_service_1 = require("../user_genre/user_genre.service");
const posting_service_1 = require("../posting/posting.service");
const participating_service_1 = require("../participating/participating.service");
const swagger_1 = require("@nestjs/swagger");
const success_api_response_1 = require("../util/success-api-response");
const api_response_service_1 = require("../../api-response.service");
const toCamelCase_interceptor_1 = require("../interceptors/toCamelCase.interceptor");
let UserController = exports.UserController = class UserController {
    constructor(userService, authService, userGenreService, postingService, participatingService, apiResponseService) {
        this.userService = userService;
        this.authService = authService;
        this.userGenreService = userGenreService;
        this.postingService = postingService;
        this.participatingService = participatingService;
        this.apiResponseService = apiResponseService;
    }
    async createTwo() {
        return this.userService.createTwo('mmmmmmmmmm@naver.com', 'password');
    }
    async createUser(body) {
        const user = await this.authService.signup(body.username, body.password);
        const userId = user.id;
        const accessToken = await this.authService.generateAccessToken(userId);
        const refreshToken = await this.authService.generateRefreshToken(userId);
        const ret = { accessToken, refreshToken, userId };
        return (0, success_api_response_1.SuccessAPIResponse)(ret, 201);
    }
    async publishTokens(userId) {
        const accessToken = await this.authService.generateAccessToken(userId);
        const refreshToken = await this.authService.generateRefreshToken(userId);
        return { accessToken, refreshToken, userId };
    }
    async login(body) {
        const user = await this.authService.signin(body.username, body.password);
        const userId = user.id;
        const ret = await this.publishTokens(userId);
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async logout(id) {
        const ret = await this.authService.removeTokens(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)();
    }
    async autoSignin(body) {
        const userId = await this.authService.verifyRefreshToken(body.refreshToken);
        if (userId) {
            const _ = await this.authService.removeAccessToken(userId);
            const accessToken = await this.authService.generateAccessToken(userId);
            const ret = { accessToken, userId };
            return (0, success_api_response_1.SuccessAPIResponse)(ret);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async getAllUsers() {
        const users = await this.userService.getAll();
        return (0, success_api_response_1.SuccessAPIResponse)(users);
    }
    async getById(id) {
        const user = await this.userService.findByUserId(parseInt(id));
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return { response: (0, success_api_response_1.SuccessAPIResponse)(user) };
    }
    async removeUser(id) {
        await this.authService.removeTokens(parseInt(id));
        await this.userService.remove(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)();
    }
    async getGenres(id) {
        const ret = await this.userGenreService.getGenresByUserId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async deleteUserGenre(id, genre_id) {
        const ret = await this.userGenreService.delete(parseInt(id), parseInt(genre_id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getPostedSurveys(id) {
        const ret = await this.postingService.getPostedSurveysByUserId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
    async getParticipatedSurveys(id) {
        const ret = await this.participatingService.getParticipatedSurveysByUserId(parseInt(id));
        return (0, success_api_response_1.SuccessAPIResponse)(ret);
    }
};
__decorate([
    (0, common_1.Post)('/transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createTwo", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'created description',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'bad Request Response try again',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/:id/logout'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/auto-signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "autoSignin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Admin, Get all users' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get user's favorite genres " }),
    (0, common_1.Get)('/:id/genres'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getGenres", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove user_genre' }),
    (0, common_1.Delete)('/:id/genre/:genre_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('genre_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserGenre", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all surveys posted by the user' }),
    (0, common_1.Get)('/:id/posted-surveys'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPostedSurveys", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get user's participated survey " }),
    (0, common_1.Get)('/:id/participated-surveys'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getParticipatedSurveys", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('/user'),
    (0, common_1.UseInterceptors)(toCamelCase_interceptor_1.ToCamelCaseInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        user_genre_service_1.UserGenreService,
        posting_service_1.PostingService,
        participating_service_1.ParticipatingService,
        api_response_service_1.ApiResponseService])
], UserController);
//# sourceMappingURL=user.controller.js.map