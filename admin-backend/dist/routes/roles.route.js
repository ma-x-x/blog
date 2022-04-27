"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _express = require("express");
var _rolesController = _interopRequireDefault(require("../controllers/roles.controller"));
var _rolesDto = require("../dtos/roles.dto");
var _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let RolesRoute = class RolesRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.rolesController.getRoles);
        this.router.get(`${this.path}/:id(\\d+)`, this.rolesController.getRoleById);
        this.router.post(`${this.path}`, (0, _validationMiddleware).default(_rolesDto.CreateRoleDto, 'body'), this.rolesController.createRole);
        this.router.put(`${this.path}/:id(\\d+)`, (0, _validationMiddleware).default(_rolesDto.CreateRoleDto, 'body', true), this.rolesController.updateRole);
        this.router.delete(`${this.path}/:id(\\d+)`, this.rolesController.deleteRole);
    }
    constructor(){
        this.path = '/roles';
        this.router = (0, _express).Router();
        this.rolesController = new _rolesController.default();
        this.initializeRoutes();
    }
};
var _default = RolesRoute;
exports.default = _default;

//# sourceMappingURL=roles.route.js.map