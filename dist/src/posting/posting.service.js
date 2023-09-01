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
exports.PostingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const posting_entity_1 = require("./posting.entity");
let PostingService = exports.PostingService = class PostingService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(survey_id, user_id) {
        const posting = this.repo.create({ survey_id, user_id });
        return await this.repo.save(posting);
    }
    async getPostedSurveysByUserId(user_id) {
        return await this.repo.find({ where: { user_id } });
    }
    async getAll() {
        return await this.repo.find();
    }
};
exports.PostingService = PostingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(posting_entity_1.Posting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostingService);
//# sourceMappingURL=posting.service.js.map