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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("../survey/survey.entity");
const createRandomAlphabets_1 = require("../util/createRandomAlphabets");
const typeorm_2 = require("typeorm");
const posting_entity_1 = require("../posting/posting.entity");
let TransactionService = exports.TransactionService = class TransactionService {
    constructor(surveyRepo, postingRepo, dataSource) {
        this.surveyRepo = surveyRepo;
        this.postingRepo = postingRepo;
        this.dataSource = dataSource;
    }
    async createSurvey(title, participationGoal, user_id) {
        const tempSurvey = this.surveyRepo.create({
            title,
            participation_goal: participationGoal,
        });
        tempSurvey.code = (0, createRandomAlphabets_1.createRandomAlphabets)(7);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const survey = await queryRunner.manager.save(survey_entity_1.Survey, tempSurvey);
            const posting = await this.postingRepo.create({
                survey_id: survey.id,
                user_id,
            });
            await queryRunner.manager.save(posting_entity_1.Posting, posting);
            console.log(`transaction committed!!`);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            console.log(`err: ${err}`);
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException();
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(1, (0, typeorm_1.InjectRepository)(posting_entity_1.Posting)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map