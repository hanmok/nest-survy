"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipatingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const participating_entity_1 = require("./participating.entity");
const participating_service_1 = require("./participating.service");
const participating_controller_1 = require("./participating.controller");
let ParticipatingModule = exports.ParticipatingModule = class ParticipatingModule {
};
exports.ParticipatingModule = ParticipatingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([participating_entity_1.Participating])],
        providers: [participating_service_1.ParticipatingService],
        controllers: [participating_controller_1.ParticipatingController]
    })
], ParticipatingModule);
//# sourceMappingURL=participating.module.js.map