"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _express = require("express");
var _usersController = _interopRequireDefault(require("../controllers/users.controller"));
var _usersDto = require("../dtos/users.dto");
var _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersRoute = class UsersRoute {
    initializeRoutes() {
        this.router.get(`/login-info`, this.usersController.getCurrentUser);
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
        this.router.post(`${this.path}`, (0, _validationMiddleware).default(_usersDto.CreateUserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id(\\d+)`, (0, _validationMiddleware).default(_usersDto.CreateUserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    }
    constructor(){
        this.path = '/users';
        this.router = (0, _express).Router();
        this.usersController = new _usersController.default();
        this.initializeRoutes();
    }
};
var _default = UsersRoute;
exports.default = _default;

//# sourceMappingURL=users.route.js.map