"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _usersService = _interopRequireDefault(require("../services/users.service"));
var _formatResult = require("../utils/formatResult");
var _rolesService = _interopRequireDefault(require("../services/roles.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersController = class UsersController {
    constructor(){
        this.userService = new _usersService.default();
        this.roleService = new _rolesService.default();
        this.getUsers = async (req, res, next)=>{
            try {
                const findAllUsersData = await this.userService.findAllUser();
                res.status(200).json((0, _formatResult).formatResultData(findAllUsersData));
            } catch (error) {
                next(error);
            }
        };
        this.getCurrentUser = async (req, res, next)=>{
            try {
                const userId = req.user.id;
                const findOneUserData = await this.userService.findCurrentUser(userId);
                res.status(200).json((0, _formatResult).formatResultData(findOneUserData));
            } catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next)=>{
            try {
                const username = req.params.username;
                const findOneUserData = await this.userService.findUserById(username);
                res.status(200).json((0, _formatResult).formatResultData(findOneUserData));
            } catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next)=>{
            try {
                const userData = req.body;
                const createUserData = await this.userService.createUser(userData);
                res.status(201).json((0, _formatResult).formatResultData(createUserData));
            } catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next)=>{
            try {
                const username = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.userService.updateUser(username, userData);
                res.status(200).json((0, _formatResult).formatResultData(updateUserData));
            } catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next)=>{
            try {
                const username = Number(req.params.id);
                const deleteUserData = await this.userService.deleteUser(username);
                res.status(200).json((0, _formatResult).formatResultData(deleteUserData));
            } catch (error) {
                next(error);
            }
        };
    }
};
var _default = UsersController;
exports.default = _default;

//# sourceMappingURL=users.controller.js.map