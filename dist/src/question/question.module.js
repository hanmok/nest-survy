"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_controller_1 = require("./question.controller");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./question.entity");
const selectable_option_entity_1 = require("../selectable-option/selectable-option.entity");
const answer_entity_1 = require("../answer/answer.entity");
const validate_question_type_pipe_1 = require("./validate-question-type.pipe");
let QuestionModule = exports.QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question, selectable_option_entity_1.SelectableOption, answer_entity_1.Answer])],
        providers: [question_service_1.QuestionService, validate_question_type_pipe_1.ValidateQuestionTypePipe],
        controllers: [question_controller_1.QuestionController],
    })
], QuestionModule);
//# sourceMappingURL=question.module.js.map