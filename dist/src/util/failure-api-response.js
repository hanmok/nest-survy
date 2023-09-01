"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureAPIResponse = void 0;
const api_response_model_1 = require("./api-response.model");
function FailureAPIResponse(statusCode = 400, message = 'failed', data) {
    return new api_response_model_1.CustomApiResponse(statusCode, message, data);
}
exports.FailureAPIResponse = FailureAPIResponse;
//# sourceMappingURL=failure-api-response.js.map