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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const QuestionType_1 = require("../util/QuestionType");
class CreateQuestionDTO {
}
exports.CreateQuestionDTO = CreateQuestionDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDTO.prototype, "section_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDTO.prototype, "survey_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0', description: 'starts from 0' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDTO.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "what's your name?" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDTO.prototype, "expectedTimeInSec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(QuestionType_1.QuestionType),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "question_type", void 0);
//# sourceMappingURL=createQuestion.dto.js.map