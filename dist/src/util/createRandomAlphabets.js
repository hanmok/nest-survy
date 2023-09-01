"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomAlphabets = void 0;
const randomString = require('randomstring');
function createRandomAlphabets(length) {
    const randomAlphabets = randomString.generate({
        length: length,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
    return randomAlphabets;
}
exports.createRandomAlphabets = createRandomAlphabets;
//# sourceMappingURL=createRandomAlphabets.js.map