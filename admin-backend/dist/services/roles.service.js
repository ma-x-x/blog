"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _databases = _interopRequireDefault(require("../databases"));
var _httpException = require("../exceptions/HttpException");
var _util = require("../utils/util");
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let RoleService = class RoleService {
    async findRolesByUserId(userId) {
        const roles = await this.userRole.findAll({
            attributes: [
                'roleId'
            ],
            where: {
                userId
            }
        });
        const allRole = await this.roles.findAll({
            attributes: [
                'id',
                'name',
                'code'
            ],
            where: {
                id: {
                    [_sequelize.Op.in]: roles
                }
            }
        });
        return allRole;
    }
    async findAllRole() {
        const allRole = await this.roles.findAll({
            order: [
                [
                    'id',
                    'DESC'
                ]
            ]
        });
        return allRole;
    }
    async findRoleById(roleId) {
        if ((0, _util).isEmpty(roleId)) throw new _httpException.HttpException(400, '参数roleId不能为空');
        const findRole = await this.roles.findOne({
            where: {
                id: roleId
            }
        });
        if (!findRole) throw new _httpException.HttpException(409, '角色Id不存在');
        return findRole;
    }
    async createRole(roleData) {
        if ((0, _util).isEmpty(roleData)) throw new _httpException.HttpException(400, '参数不能为空');
        const findRole = await this.roles.findOne({
            where: {
                name: roleData.name
            }
        });
        if (findRole) throw new _httpException.HttpException(409, `角色名称已存在`);
        const createRoleData = await this.roles.create(roleData);
        return createRoleData;
    }
    async updateRole(roleId, roleData) {
        if ((0, _util).isEmpty(roleData)) throw new _httpException.HttpException(400, '参数不能为空');
        const findRole = await this.roles.findByPk(roleId);
        if (!findRole) throw new _httpException.HttpException(409, '角色不存在');
        await this.roles.update(roleData, {
            where: {
                id: roleId
            }
        });
        const updateRole = await this.roles.findByPk(roleId);
        return updateRole;
    }
    async deleteRole(roleId) {
        if ((0, _util).isEmpty(roleId)) throw new _httpException.HttpException(400, '参数roleId不能为空');
        const findRole = await this.roles.findByPk(roleId);
        if (!findRole) throw new _httpException.HttpException(409, '角色不存在');
        await this.roles.destroy({
            where: {
                id: roleId
            }
        });
        return findRole;
    }
    constructor(){
        this.roles = _databases.default.Roles;
    }
};
var _default = RoleService;
exports.default = _default;

//# sourceMappingURL=roles.service.js.map