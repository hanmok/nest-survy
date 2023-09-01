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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const typeorm_2 = require("typeorm");
const accessToken_entity_1 = require("../accessToken.entity");
const refreshToken_entity_1 = require("../refreshToken.entity");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService, userRepo, accessTokenRepo, refreshTokenRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
        this.accessTokenRepo = accessTokenRepo;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async generateAccessToken(userId) {
        let payload = { userId };
        const accessToken = await this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
        });
        const newToken = this.accessTokenRepo.create({
            token: accessToken,
            user_id: userId,
        });
        const newAccessToken = await this.accessTokenRepo.save(newToken);
        console.log(`newAccessToken saved: ${newAccessToken}`);
        return newAccessToken.token;
    }
    async generateRefreshToken(userId) {
        let payload = { userId };
        const refreshToken = await this.jwtService.sign(payload, {
            expiresIn: '60d',
            secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
        });
        const newToken = this.refreshTokenRepo.create({
            token: refreshToken,
            user_id: userId,
        });
        const newRefreshToken = await this.refreshTokenRepo.save(newToken);
        console.log(`newRefreshToken saved: ${newRefreshToken}`);
        return newRefreshToken.token;
    }
    async verifyRefreshToken(token) {
        const validToken = await this.refreshTokenRepo.findOne({
            where: { token },
        });
        const refreshToken = this.jwtService.verify(token, {
            secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
        });
        return validToken.user_id;
    }
    async verifyAccessToken(token) {
        const accessToken = this.jwtService.verify(token, {
            secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
        });
        return { accessToken: accessToken['accessToken'] };
    }
    async signup(username, password) {
        const users = await this.userRepo.find({ where: { username } });
        if (users.length) {
            throw new common_1.BadRequestException('username in use');
        }
        console.log(`creating username: ${username}, password: ${password}`);
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (await scrypt(password, salt, 32));
        const result = salt + '.' + hash.toString('hex');
        const user = this.userRepo.create({ username, password: result });
        const _ = await this.userRepo.save(user);
        return user;
    }
    async removeTokens(userId) {
        await this.refreshTokenRepo.delete({ user_id: userId });
        await this.accessTokenRepo.delete({ user_id: userId });
    }
    async removeAccessToken(userId) {
        await this.accessTokenRepo.delete({ user_id: userId });
    }
    async userHasToken(userId) {
        const user1 = await this.refreshTokenRepo.find({
            where: { user_id: userId },
        });
        const user2 = await this.accessTokenRepo.find({
            where: { user_id: userId },
        });
        return user1 || user2;
    }
    async signin(username, password) {
        console.log(`signing username: ${username}, password: ${password}`);
        const [user] = await this.userRepo.find({ where: { username } });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32));
        if (storedHash !== hash.toString('hex')) {
            throw new common_1.BadRequestException('bad password');
        }
        return user;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(accessToken_entity_1.AccessToken)),
    __param(3, (0, typeorm_1.InjectRepository)(refreshToken_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map