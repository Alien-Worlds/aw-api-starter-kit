"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramCase = void 0;
var tslib_1 = require("tslib");
var dot_case_1 = require("../dot-case");
function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "-" }, options));
}
exports.paramCase = paramCase;
//# sourceMappingURL=index.js.map