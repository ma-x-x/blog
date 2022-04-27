"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
let RoleModel = class RoleModel extends _sequelize.Model {
};
exports.RoleModel = RoleModel;
function _default(sequelize) {
    RoleModel.init({
        id: {
            autoIncrement: true,
            type: _sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(64)
        },
        code: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(45),
            unique: true
        },
        sort: {
            type: _sequelize.DataTypes.INTEGER
        },
        status: {
            type: _sequelize.DataTypes.INTEGER,
            defaultValue: 1
        },
        deleted: {
            type: _sequelize.DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'roles',
        sequelize
    });
    return RoleModel;
}

//# sourceMappingURL=roles.model.js.map