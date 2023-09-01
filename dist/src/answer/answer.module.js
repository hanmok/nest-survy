"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const answer_entity_1 = require("./answer.entity");
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const answer_controller_1 = require("./answer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const section_service_1 = require("../section/section.service");
const section_entity_1 = require("../section/section.entity");
const question_entity_1 = require("../question/question.entity");
const question_service_1 = require("../question/question.service");
const selectable_option_entity_1 = require("../selectable-option/selectable-option.entity");
const selectable_option_service_1 = require("../selectable-option/selectable-option.service");
const validate_question_type_pipe_1 = require("../question/validate-question-type.pipe");
const participating_service_1 = require("../participating/participating.service");
const participating_entity_1 = require("../participating/participating.entity");
let AnswerModule = exports.AnswerModule = class AnswerModule {
};
exports.AnswerModule = AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                answer_entity_1.Answer,
                section_entity_1.Section,
                question_entity_1.Question,
                selectable_option_entity_1.SelectableOption,
                participating_entity_1.Participating,
            ]),
        ],
        providers: [
            answer_service_1.AnswerService,
            section_service_1.SectionService,
            question_service_1.QuestionService,
            selectable_option_service_1.SelectableOptionService,
            validate_question_type_pipe_1.ValidateQuestionTypePipe,
            participating_service_1.ParticipatingService,
        ],
        controllers: [answer_controller_1.AnswerController],
    })
], AnswerModule);
//# sourceMappingURL=answer.module.js.map