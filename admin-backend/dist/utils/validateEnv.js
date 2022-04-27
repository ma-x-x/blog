"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _envalid = require("envalid");
function validateEnv() {
    (0, _envalid).cleanEnv(process.env, {
        NODE_ENV: (0, _envalid).str(),
        PORT: (0, _envalid).port()
    });
}
var _default = validateEnv;
exports.default = _default;

//# sourceMappingURL=validateEnv.js.map