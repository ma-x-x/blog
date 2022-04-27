"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _express = require("express");
var _menusController = _interopRequireDefault(require("../controllers/menus.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersRoute = class UsersRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.menusController.getMenus);
    }
    constructor(){
        this.path = '/menus';
        this.router = (0, _express).Router();
        this.menusController = new _menusController.default();
        this.initializeRoutes();
    }
};
var _default = UsersRoute;
exports.default = _default;

//# sourceMappingURL=menus.route.js.map