"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const genre_module_1 = require("./genre/genre.module");
const question_module_1 = require("./question/question.module");
const section_module_1 = require("./section/section.module");
const survey_module_1 = require("./survey/survey.module");
const answer_module_1 = require("./answer/answer.module");
const segment_module_1 = require("./segment/segment.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./user/auth/auth.service");
const selectable_option_module_1 = require("./selectable-option/selectable-option.module");
const section_bridge_module_1 = require("./section-bridge/section-bridge.module");
const user_service_1 = require("./user/user.service");
const user_entity_1 = require("./user/user.entity");
const genre_entity_1 = require("./genre/genre.entity");
const question_entity_1 = require("./question/question.entity");
const answer_entity_1 = require("./answer/answer.entity");
const section_entity_1 = require("./section/section.entity");
const section_bridge_entity_1 = require("./section-bridge/section-bridge.entity");
const segment_entity_1 = require("./segment/segment.entity");
const selectable_option_entity_1 = require("./selectable-option/selectable-option.entity");
const survey_entity_1 = require("./survey/survey.entity");
const genre_service_1 = require("./genre/genre.service");
const genre_controller_1 = require("./genre/genre.controller");
const user_controller_1 = require("./user/user.controller");
const config_2 = require("./config");
const user_genre_service_1 = require("./user_genre/user_genre.service");
const user_genre_module_1 = require("./user_genre/user_genre.module");
const survey_genre_service_1 = require("./survey_genre/survey_genre.service");
const survey_genre_module_1 = require("./survey_genre/survey_genre.module");
const posting_service_1 = require("./posting/posting.service");
const posting_module_1 = require("./posting/posting.module");
const participating_service_1 = require("./participating/participating.service");
const participating_module_1 = require("./participating/participating.module");
const question_controller_1 = require("./question/question.controller");
const answer_controller_1 = require("./answer/answer.controller");
const section_controller_1 = require("./section/section.controller");
const segment_controller_1 = require("./segment/segment.controller");
const selectable_option_controller_1 = require("./selectable-option/selectable-option.controller");
const survey_controller_1 = require("./survey/survey.controller");
const question_service_1 = require("./question/question.service");
const answer_service_1 = require("./answer/answer.service");
const section_service_1 = require("./section/section.service");
const section_bridge_service_1 = require("./section-bridge/section-bridge.service");
const segment_service_1 = require("./segment/segment.service");
const selectable_option_service_1 = require("./selectable-option/selectable-option.service");
const survey_service_1 = require("./survey/survey.service");
const user_genre_entity_1 = require("./user_genre/user_genre.entity");
const participating_entity_1 = require("./participating/participating.entity");
const posting_entity_1 = require("./posting/posting.entity");
const survey_genre_entity_1 = require("./survey_genre/survey_genre.entity");
const auth_module_1 = require("./user/auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./user/jwt.strategy");
const accessToken_entity_1 = require("./user/accessToken.entity");
const refreshToken_entity_1 = require("./user/refreshToken.entity");
const section_bridge_controller_1 = require("./section-bridge/section-bridge.controller");
const survey_genre_controller_1 = require("./survey_genre/survey_genre.controller");
const custom_response_dto_1 = require("../custom-response.dto");
const api_response_service_1 = require("../api-response.service");
const transaction_service_1 = require("./transaction/transaction.service");
const validate_question_type_pipe_1 = require("./question/validate-question-type.pipe");
const custom_answer_module_1 = require("./custom_answer/custom_answer.module");
const custom_answer_entity_1 = require("./custom_answer/custom_answer.entity");
const custom_answer_controller_1 = require("./custom_answer/custom_answer.controller");
const custom_answer_service_1 = require("./custom_answer/custom_answer.service");
require('dotenv').config();
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.config],
            }),
            jwt_1.JwtModule.register({
                secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
                secretOrPrivateKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'us-cdbr-east-06.cleardb.net',
                port: 3306,
                username: 'bce8ef11b95d3a',
                password: 'c3fa51f1',
                database: 'heroku_3df4ab91447196b',
                synchronize: false,
                entities: [
                    genre_entity_1.Genre,
                    participating_entity_1.Participating,
                    posting_entity_1.Posting,
                    question_entity_1.Question,
                    answer_entity_1.Answer,
                    section_entity_1.Section,
                    section_bridge_entity_1.SectionBridge,
                    segment_entity_1.Segment,
                    selectable_option_entity_1.SelectableOption,
                    survey_entity_1.Survey,
                    survey_genre_entity_1.SurveyGenre,
                    user_entity_1.User,
                    user_genre_entity_1.UserGenre,
                    accessToken_entity_1.AccessToken,
                    refreshToken_entity_1.RefreshToken,
                    custom_response_dto_1.CustomResponseDto,
                    custom_answer_entity_1.CustomAnswer,
                ],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                custom_answer_entity_1.CustomAnswer,
                genre_entity_1.Genre,
                participating_entity_1.Participating,
                posting_entity_1.Posting,
                question_entity_1.Question,
                answer_entity_1.Answer,
                section_entity_1.Section,
                section_bridge_entity_1.SectionBridge,
                segment_entity_1.Segment,
                selectable_option_entity_1.SelectableOption,
                survey_entity_1.Survey,
                survey_genre_entity_1.SurveyGenre,
                user_entity_1.User,
                user_genre_entity_1.UserGenre,
                accessToken_entity_1.AccessToken,
                refreshToken_entity_1.RefreshToken,
                custom_response_dto_1.CustomResponseDto,
            ]),
            segment_module_1.SegmentModule,
            custom_answer_module_1.CustomAnswerModule,
            genre_module_1.GenreModule,
            question_module_1.QuestionModule,
            answer_module_1.AnswerModule,
            section_module_1.SectionModule,
            section_bridge_module_1.SectionBridgeModule,
            segment_module_1.SegmentModule,
            selectable_option_module_1.SelectableOptionModule,
            survey_module_1.SurveyModule,
            user_module_1.UserModule,
            user_genre_module_1.UserGenreModule,
            survey_genre_module_1.SurveyGenreModule,
            posting_module_1.PostingModule,
            participating_module_1.ParticipatingModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            custom_answer_module_1.CustomAnswerModule,
        ],
        controllers: [
            app_controller_1.AppController,
            genre_controller_1.GenreController,
            question_controller_1.QuestionController,
            answer_controller_1.AnswerController,
            section_controller_1.SectionController,
            segment_controller_1.SegmentController,
            selectable_option_controller_1.SelectableOptionController,
            survey_controller_1.SurveyController,
            survey_genre_controller_1.SurveyGenreController,
            user_controller_1.UserController,
            section_bridge_controller_1.SectionBridgeController,
            custom_answer_controller_1.CustomAnswerController,
        ],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            genre_service_1.GenreService,
            question_service_1.QuestionService,
            answer_service_1.AnswerService,
            section_service_1.SectionService,
            section_bridge_service_1.SectionBridgeService,
            segment_service_1.SegmentService,
            selectable_option_service_1.SelectableOptionService,
            custom_answer_service_1.CustomAnswerService,
            jwt_1.JwtService,
            jwt_strategy_1.JwtStrategy,
            survey_service_1.SurveyService,
            user_service_1.UserService,
            user_genre_service_1.UserGenreService,
            survey_genre_service_1.SurveyGenreService,
            posting_service_1.PostingService,
            participating_service_1.ParticipatingService,
            api_response_service_1.ApiResponseService,
            transaction_service_1.TransactionService,
            validate_question_type_pipe_1.ValidateQuestionTypePipe,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map