"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _authService = _interopRequireDefault(require("../services/auth.service"));
var _formatResult = require("../utils/formatResult");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    constructor(){
        this.authService = new _authService.default();
        this.signUp = async (req, res, next)=>{
            try {
                const userData = req.body;
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json((0, _formatResult).formatResultData(signUpUserData));
            } catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next)=>{
            try {
                const userData = req.body;
                const { cookie , token , findUser  } = await this.authService.login(userData);
                res.setHeader('Set-Cookie', [
                    cookie
                ]);
                res.status(200).json((0, _formatResult).formatResultData({
                    username: findUser.username,
                    email: findUser.email,
                    id: findUser.id,
                    access_token: token
                }));
            } catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next)=>{
            try {
                const userData = req.user;
                const logOutUserData = await this.authService.logout(userData);
                res.setHeader('Set-Cookie', [
                    'Authorization=; Max-age=0'
                ]);
                res.status(200).json((0, _formatResult).formatResultData(logOutUserData));
            } catch (error) {
                next(error);
            }
        };
    }
};
var _default = AuthController;
exports.default = _default;

//# sourceMappingURL=auth.controller.js.map