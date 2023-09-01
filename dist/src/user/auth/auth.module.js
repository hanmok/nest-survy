"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("../jwt.strategy");
const user_service_1 = require("../user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const accessToken_entity_1 = require("../accessToken.entity");
const refreshToken_entity_1 = require("../refreshToken.entity");
require('dotenv').config();
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
                secretOrPrivateKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F'
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, accessToken_entity_1.AccessToken, refreshToken_entity_1.RefreshToken])
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, user_service_1.UserService],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map