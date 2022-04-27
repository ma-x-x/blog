"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _rolesService = _interopRequireDefault(require("../services/roles.service"));
var _formatResult = require("../utils/formatResult");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let RolesController = class RolesController {
    constructor(){
        this.roleService = new _rolesService.default();
        this.getRoles = async (req, res, next)=>{
            try {
                const findAllRolesData = await this.roleService.findAllRole();
                res.status(200).json((0, _formatResult).formatResultData(findAllRolesData));
            } catch (error) {
                next(error);
            }
        };
        this.getRoleById = async (req, res, next)=>{
            try {
                const roleId = req.params.roleId;
                const findOneRoleData = await this.roleService.findRoleById(roleId);
                res.status(200).json((0, _formatResult).formatResultData(findOneRoleData));
            } catch (error) {
                next(error);
            }
        };
        this.createRole = async (req, res, next)=>{
            try {
                const roleData = req.body;
                const createRoleData = await this.roleService.createRole(roleData);
                res.status(201).json((0, _formatResult).formatResultData(createRoleData));
            } catch (error) {
                next(error);
            }
        };
        this.updateRole = async (req, res, next)=>{
            try {
                const roleId = Number(req.params.id);
                const roleData = req.body;
                const updateRoleData = await this.roleService.updateRole(roleId, roleData);
                res.status(200).json((0, _formatResult).formatResultData(updateRoleData));
            } catch (error) {
                next(error);
            }
        };
        this.deleteRole = async (req, res, next)=>{
            try {
                const roleId = Number(req.params.id);
                const deleteRoleData = await this.roleService.deleteRole(roleId);
                res.status(200).json((0, _formatResult).formatResultData(deleteRoleData));
            } catch (error) {
                next(error);
            }
        };
    }
};
var _default = RolesController;
exports.default = _default;

//# sourceMappingURL=roles.controller.js.map