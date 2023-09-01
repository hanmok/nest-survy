"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionBridgeModule = void 0;
const common_1 = require("@nestjs/common");
const section_bridge_service_1 = require("./section-bridge.service");
const typeorm_1 = require("@nestjs/typeorm");
const section_bridge_entity_1 = require("./section-bridge.entity");
const section_bridge_controller_1 = require("./section-bridge.controller");
let SectionBridgeModule = exports.SectionBridgeModule = class SectionBridgeModule {
};
exports.SectionBridgeModule = SectionBridgeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                section_bridge_entity_1.SectionBridge
            ])],
        providers: [section_bridge_service_1.SectionBridgeService],
        controllers: [section_bridge_controller_1.SectionBridgeController]
    })
], SectionBridgeModule);
//# sourceMappingURL=section-bridge.module.js.map