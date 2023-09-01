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
exports.QuestionDTO = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const QuestionType_1 = require("../util/QuestionType");
class QuestionDTO {
}
exports.QuestionDTO = QuestionDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "section_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "survey_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sequence within section' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "what's your name?" }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QuestionDTO.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "expected_time_in_sec", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], QuestionDTO.prototype, "required", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QuestionDTO.prototype, "question_type", void 0);
//# sourceMappingURL=Question.dto.js.map