"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
exports.jwtUnlessPath = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config");
var _httpException = require("../exceptions/HttpException");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const jwtUnlessPath = [
    '/login',
    '/signup'
];
exports.jwtUnlessPath = jwtUnlessPath;
function _default() {
    return async function jwtTokenParse(req, res, next) {
        if (jwtUnlessPath.find((item)=>item === req.url
        )) {
            await next();
            return false;
        }
        const token = req.header('authorization');
        if (!token) {
            next(new _httpException.HttpException(401, 'Token身份无效!'));
        }
        try {
            let payload = _jsonwebtoken.default.verify(token.split(' ')[1], _config.SECRET_KEY);
            req.user = {
                username: payload.username,
                email: payload.email,
                id: payload.id
            };
            next();
        } catch (err) {
            next(new _httpException.HttpException(401, 'Token身份无效!'));
        }
    };
}

//# sourceMappingURL=auth.jwtToken.js.map