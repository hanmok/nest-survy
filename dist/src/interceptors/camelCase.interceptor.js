"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToCamelCaseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const lodash_1 = require("lodash");
let ToCamelCaseInterceptor = exports.ToCamelCaseInterceptor = class ToCamelCaseInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => this.transformKeysToCamelCase(data)));
    }
    transformKeysToCamelCase(data) {
        if (Array.isArray(data)) {
            return data.map((item) => this.transformKeysToCamelCase(item));
        }
        else if (data !== null && typeof data === 'object') {
            const transformedData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    transformedData[(0, lodash_1.camelCase)(key)] = this.transformKeysToCamelCase(data[key]);
                }
            }
            return transformedData;
        }
        return data;
    }
};
exports.ToCamelCaseInterceptor = ToCamelCaseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ToCamelCaseInterceptor);
//# sourceMappingURL=camelCase.interceptor.js.map