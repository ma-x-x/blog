"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _authRoute = _interopRequireDefault(require("./auth.route"));
var _usersRoute = _interopRequireDefault(require("./users.route"));
var _rolesRoute = _interopRequireDefault(require("./roles.route"));
var _menusRoute = _interopRequireDefault(require("./menus.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _default = [
    new _usersRoute.default(),
    new _authRoute.default(),
    new _rolesRoute.default(),
    new _menusRoute.default()
];
exports.default = _default;

//# sourceMappingURL=index.route.js.map