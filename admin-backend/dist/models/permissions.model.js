"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
let PermissionModel = class PermissionModel extends _sequelize.Model {
};
exports.PermissionModel = PermissionModel;
function _default(sequelize) {
    PermissionModel.init({
        id: {
            autoIncrement: true,
            type: _sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(64)
        },
        menuId: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        urlPerm: {
            type: _sequelize.DataTypes.STRING(128)
        },
        btnPerm: {
            type: _sequelize.DataTypes.STRING(128)
        }
    }, {
        tableName: 'roles',
        sequelize
    });
    return PermissionModel;
}

//# sourceMappingURL=permissions.model.js.map