"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const auth_service_1 = require("./auth/auth.service");
const user_genre_entity_1 = require("../user_genre/user_genre.entity");
const posting_entity_1 = require("../posting/posting.entity");
const participating_entity_1 = require("../participating/participating.entity");
const user_genre_service_1 = require("../user_genre/user_genre.service");
const posting_service_1 = require("../posting/posting.service");
const participating_service_1 = require("../participating/participating.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const accessToken_entity_1 = require("./accessToken.entity");
const refreshToken_entity_1 = require("./refreshToken.entity");
const custom_response_dto_1 = require("../../custom-response.dto");
const api_response_service_1 = require("../../api-response.service");
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                user_genre_entity_1.UserGenre,
                posting_entity_1.Posting,
                participating_entity_1.Participating,
                accessToken_entity_1.AccessToken,
                refreshToken_entity_1.RefreshToken,
                custom_response_dto_1.CustomResponseDto
            ]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                session: false
            }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: '046e13dae9c744286aea80fc54f6f203b1a15e36'
                })
            })
        ],
        providers: [user_service_1.UserService,
            auth_service_1.AuthService,
            jwt_1.JwtService,
            user_genre_service_1.UserGenreService,
            posting_service_1.PostingService,
            participating_service_1.ParticipatingService,
            api_response_service_1.ApiResponseService
        ],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map