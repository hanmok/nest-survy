"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModule = void 0;
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const survey_controller_1 = require("./survey.controller");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("./survey.entity");
const survey_genre_entity_1 = require("../survey_genre/survey_genre.entity");
const survey_genre_service_1 = require("../survey_genre/survey_genre.service");
const posting_service_1 = require("../posting/posting.service");
const participating_service_1 = require("../participating/participating.service");
const posting_entity_1 = require("../posting/posting.entity");
const participating_entity_1 = require("../participating/participating.entity");
const transaction_service_1 = require("../transaction/transaction.service");
const section_service_1 = require("../section/section.service");
const section_entity_1 = require("../section/section.entity");
const question_entity_1 = require("../question/question.entity");
const question_service_1 = require("../question/question.service");
const selectable_option_entity_1 = require("../selectable-option/selectable-option.entity");
const answer_entity_1 = require("../answer/answer.entity");
const validate_question_type_pipe_1 = require("../question/validate-question-type.pipe");
let SurveyModule = exports.SurveyModule = class SurveyModule {
};
exports.SurveyModule = SurveyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                survey_entity_1.Survey,
                survey_genre_entity_1.SurveyGenre,
                posting_entity_1.Posting,
                participating_entity_1.Participating,
                section_entity_1.Section,
                question_entity_1.Question,
                selectable_option_entity_1.SelectableOption,
                answer_entity_1.Answer,
            ]),
        ],
        providers: [
            survey_service_1.SurveyService,
            survey_genre_service_1.SurveyGenreService,
            posting_service_1.PostingService,
            participating_service_1.ParticipatingService,
            transaction_service_1.TransactionService,
            section_service_1.SectionService,
            question_service_1.QuestionService,
            validate_question_type_pipe_1.ValidateQuestionTypePipe,
        ],
        controllers: [survey_controller_1.SurveyController],
    })
], SurveyModule);
//# sourceMappingURL=survey.module.js.map