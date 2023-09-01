"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessAPIResponse = void 0;
const api_response_model_1 = require("./api-response.model");
function SuccessAPIResponse(data, statusCode = 200, message = 'success') {
    return new api_response_model_1.CustomApiResponse(statusCode, message, data);
}
exports.SuccessAPIResponse = SuccessAPIResponse;
//# sourceMappingURL=success-api-response.js.map