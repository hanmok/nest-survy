"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyGenreModule = void 0;
const common_1 = require("@nestjs/common");
const survey_genre_controller_1 = require("./survey_genre.controller");
const typeorm_1 = require("@nestjs/typeorm");
const survey_genre_entity_1 = require("./survey_genre.entity");
const survey_genre_service_1 = require("./survey_genre.service");
let SurveyGenreModule = exports.SurveyGenreModule = class SurveyGenreModule {
};
exports.SurveyGenreModule = SurveyGenreModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([survey_genre_entity_1.SurveyGenre])],
        providers: [survey_genre_service_1.SurveyGenreService],
        controllers: [survey_genre_controller_1.SurveyGenreController]
    })
], SurveyGenreModule);
//# sourceMappingURL=survey_genre.module.js.map