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
exports.AnswerService = void 0;
const selectable_option_service_1 = require("./../selectable-option/selectable-option.service");
const question_service_1 = require("../question/question.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answer_entity_1 = require("./answer.entity");
const typeorm_2 = require("typeorm");
const matchedAnswer_1 = require("../util/matchedAnswer");
const participating_service_1 = require("../participating/participating.service");
const userAnswer_1 = require("../util/userAnswer");
const AnswerPair_1 = require("../util/AnswerPair");
const questionPair_1 = require("../util/questionPair");
let AnswerService = exports.AnswerService = class AnswerService {
    constructor(answerRepo, questionService, selectableOptionService, participatingService) {
        this.answerRepo = answerRepo;
        this.questionService = questionService;
        this.selectableOptionService = selectableOptionService;
        this.participatingService = participatingService;
    }
    async getAll() {
        return await this.answerRepo.find();
    }
    async createAnswer(createAnswerDTO) {
        const answer = this.answerRepo.create(createAnswerDTO);
        return await this.answerRepo.save(answer);
    }
    async getAnswersByUserId(user_id, survey_id) {
        const questions = (await this.questionService.findBySurveyId(survey_id)).sort((a, b) => a.position - b.position);
        const answers = await this.answerRepo.find({
            where: { user_id },
        });
        const selectableIds = answers.map((answer) => answer.selectable_option_id);
        const selectableOptions = await this.selectableOptionService.findByIds(selectableIds);
        let selectableDictionary = {};
        selectableOptions.forEach((selectableOption) => {
            selectableDictionary[selectableOption.id] = selectableOption.value;
        });
        let matchedAnswers = [];
        questions.forEach((question) => {
            let q_id = question.id;
            let q_text = question.text;
            let selectableOption = selectableOptions.find((selectableOption) => selectableOption.question_id === question.id);
            let a_text = selectableOption.value;
            let matchedAnswer = new matchedAnswer_1.MatchedAnswer(q_id, q_text, a_text);
            matchedAnswers.push(matchedAnswer);
        });
        matchedAnswers.forEach((matchedAnswer) => {
            console.log(`question: ${matchedAnswer.question_text}, answer Text: ${matchedAnswer.answer_text}`);
        });
        return matchedAnswers;
    }
    async getAnswerBySurveyId(survey_id) {
        const userIds = await this.participatingService.getParticipatedUsersBySurveyId(survey_id);
        const uniqueUserIds = [...new Set(userIds)];
        const questions = (await this.questionService.findBySurveyId(survey_id)).sort((a, b) => a.position - b.position);
        const questionIds = questions.map((q) => q.id);
        const questionPairs = questions.map((q) => new questionPair_1.QuestionPair(q.id, q.text, q.section_id));
        const answers = await this.answerRepo.findBy({
            question_id: (0, typeorm_2.In)(questionIds),
        });
        const selectableOptionIds = answers.map((a) => a.selectable_option_id);
        const uniqueSelectableOptionIds = [...new Set(selectableOptionIds)];
        const selectableOptions = await this.selectableOptionService.findByIds(uniqueSelectableOptionIds);
        let selectableDictionary = {};
        selectableOptions.forEach((selectableOption) => {
            selectableDictionary[selectableOption.id] = selectableOption.value;
        });
        let userAnswersDic = {};
        uniqueUserIds.forEach((user_id) => {
            userAnswersDic[user_id] = [];
        });
        answers.forEach((answer) => {
            let answerText = selectableDictionary[answer.selectable_option_id];
            userAnswersDic[answer.user_id].push(new AnswerPair_1.AnswerPair(answer.question_id, answerText));
        });
        let userAnswers = [];
        uniqueUserIds.forEach((user_id) => {
            userAnswers.push(new userAnswer_1.UserAnswer(user_id, userAnswersDic[user_id]));
        });
        return { questionPairs, userAnswers };
    }
};
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        question_service_1.QuestionService,
        selectable_option_service_1.SelectableOptionService,
        participating_service_1.ParticipatingService])
], AnswerService);
//# sourceMappingURL=answer.service.js.map