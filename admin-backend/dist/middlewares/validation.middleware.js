"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _classTransformer = require("class-transformer");
var _classValidator = require("class-validator");
var _httpException = require("../exceptions/HttpException");
const validationMiddleware = (type, value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true)=>{
    return (req, res, next)=>{
        (0, _classValidator).validate((0, _classTransformer).plainToClass(type, req[value]), {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted
        }).then((errors)=>{
            if (errors.length > 0) {
                const message = errors.map((error)=>Object.values(error.constraints)
                ).join(', ');
                next(new _httpException.HttpException(400, message));
            } else {
                next();
            }
        });
    };
};
var _default = validationMiddleware;
exports.default = _default;

//# sourceMappingURL=validation.middleware.js.map