"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _formatResult = require("../utils/formatResult");
var _usersService = _interopRequireDefault(require("../services/users.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let MenusController = class MenusController {
    constructor(){
        this.userService = new _usersService.default();
        this.getMenus = async (req, res, next)=>{
            try {
                let userInfo = this.userService.findMenusById(req.user.id);
                console.log('userInfo: ', userInfo);
                res.status(200).json((0, _formatResult).formatResultData([]));
            } catch (error) {
                next(error);
            }
        };
    }
};
var _default = MenusController;
exports.default = _default;

//# sourceMappingURL=menus.controller.js.map