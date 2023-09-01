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
exports.SelectableOptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const selectable_option_entity_1 = require("./selectable-option.entity");
const typeorm_2 = require("typeorm");
let SelectableOptionService = exports.SelectableOptionService = class SelectableOptionService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(selectableOptionDTO) {
        const selectableOption = this.repo.create(selectableOptionDTO);
        return await this.repo.save(selectableOption);
    }
    async findByIds(ids) {
        const selectableOptions = await this.repo.findBy({ id: (0, typeorm_2.In)(ids) });
        return selectableOptions;
    }
    async findByQuestionId(question_id) {
        return await this.repo.find({ where: { question_id } });
    }
    async adminFindAll() {
        return await this.repo.find();
    }
};
exports.SelectableOptionService = SelectableOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(selectable_option_entity_1.SelectableOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SelectableOptionService);
//# sourceMappingURL=selectable-option.service.js.map