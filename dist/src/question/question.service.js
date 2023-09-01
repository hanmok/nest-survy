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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_entity_1 = require("./question.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const selectable_option_entity_1 = require("../selectable-option/selectable-option.entity");
const answer_entity_1 = require("../answer/answer.entity");
const validate_question_type_pipe_1 = require("./validate-question-type.pipe");
let QuestionService = exports.QuestionService = class QuestionService {
    constructor(repo, selectableOptionRepo, answerRepo, questionTypeValidationPipe) {
        this.repo = repo;
        this.selectableOptionRepo = selectableOptionRepo;
        this.answerRepo = answerRepo;
        this.questionTypeValidationPipe = questionTypeValidationPipe;
    }
    async getAll() {
        return await this.repo.find();
    }
    async create(questionDTO) {
        const question = this.repo.create(questionDTO);
        return await this.repo.save(question);
    }
    async findById(id) {
        return await this.repo.findOneBy({ id });
    }
    async findBySurveyId(survey_id) {
        const questions = await this.repo.find({ where: { survey_id } });
        console.log(`questions: ${questions}, number: ${questions.length}`);
        return questions;
    }
    async getSelectableOptionsByCurrentId(question_id) {
        return await this.selectableOptionRepo.find({ where: { question_id } });
    }
    async getAnswersByQuestionId(question_id) {
        return await this.answerRepo.find({ where: { question_id } });
    }
};
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_2.InjectRepository)(selectable_option_entity_1.SelectableOption)),
    __param(2, (0, typeorm_2.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        validate_question_type_pipe_1.ValidateQuestionTypePipe])
], QuestionService);
//# sourceMappingURL=question.service.js.map