"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _databases = _interopRequireDefault(require("../databases"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UserService = class UserService {
    async findMenusByRoleId() {
        const menus = await this.menus.findAll({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            order: [
                [
                    'id',
                    'DESC'
                ]
            ]
        });
        return menus;
    }
    constructor(){
        this.menus = _databases.default.Menus;
        this.roles = _databases.default.Roles;
    }
};
var _default = UserService;
exports.default = _default;

//# sourceMappingURL=menus.service.js.map