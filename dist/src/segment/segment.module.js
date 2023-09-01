"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentModule = void 0;
const common_1 = require("@nestjs/common");
const segment_service_1 = require("./segment.service");
const segment_controller_1 = require("./segment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const segment_entity_1 = require("./segment.entity");
let SegmentModule = exports.SegmentModule = class SegmentModule {
};
exports.SegmentModule = SegmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([segment_entity_1.Segment])],
        providers: [segment_service_1.SegmentService],
        controllers: [segment_controller_1.SegmentController]
    })
], SegmentModule);
//# sourceMappingURL=segment.module.js.map