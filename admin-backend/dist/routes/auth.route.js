"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _express = require("express");
var _authController = _interopRequireDefault(require("../controllers/auth.controller"));
var _usersDto = require("../dtos/users.dto");
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware"));
var _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthRoute = class AuthRoute {
    initializeRoutes() {
        this.router.post(`${this.path}signup`, (0, _validationMiddleware).default(_usersDto.CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}login`, (0, _validationMiddleware).default(_usersDto.LoginUserDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, _authMiddleware.default, this.authController.logOut);
    }
    constructor(){
        this.path = '/';
        this.router = (0, _express).Router();
        this.authController = new _authController.default();
        this.initializeRoutes();
    }
};
var _default = AuthRoute;
exports.default = _default;

//# sourceMappingURL=auth.route.js.map