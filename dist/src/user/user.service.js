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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const config_1 = require("@nestjs/config");
const typeorm_3 = require("typeorm");
const user_dto_1 = require("./dtos/user.dto");
const class_transformer_1 = require("class-transformer");
let UserService = exports.UserService = class UserService {
    constructor(repo, dataSource, configService) {
        this.repo = repo;
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async getDBConfiguration() {
        const dbHost = this.configService.get('database.host');
        const dbPort = this.configService.get('database.port');
        const dbUsername = this.configService.get('database.username');
        const dbPassword = this.configService.get('database.password');
        return {
            host: dbHost,
            port: dbPort,
            username: dbUsername,
            password: dbPassword,
        };
    }
    async createTwo(email, password) {
        const user1 = this.repo.create({ username: '1' + email, password });
        const user2 = this.repo.create({ username: '2' + email, password });
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(user_entity_1.User, user1);
            await queryRunner.manager.save(user_entity_1.User, user2);
            const some = await queryRunner.manager.find(user_entity_1.User);
            await queryRunner.commitTransaction();
            console.log(some);
        }
        catch (err) {
            console.log(`error!!! ${err}`);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async create(username, password) {
        const user = this.repo.create({ username, password });
        return await this.repo.save(user);
    }
    async update(id, attrs) {
        const user = await this.findByUserId(id);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return await this.repo.save(user);
    }
    async remove(id) {
        const user = await this.findByUserId(id);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return await this.repo.remove(user);
    }
    async findByUserId(id) {
        if (!id) {
            return null;
        }
        return await this.repo.findOneBy({ id });
    }
    async findByUsername(username) {
        return await this.repo.find({ where: { username } });
    }
    async getAll() {
        const users = await this.repo.find();
        const dtos = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, users);
        return dtos;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_3.DataSource,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map