"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
let MenuModel = class MenuModel extends _sequelize.Model {
};
exports.MenuModel = MenuModel;
function _default(sequelize) {
    MenuModel.init({
        id: {
            autoIncrement: true,
            type: _sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(64)
        },
        parentId: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        path: {
            type: _sequelize.DataTypes.STRING(128)
        },
        component: {
            type: _sequelize.DataTypes.STRING(128)
        },
        icon: {
            type: _sequelize.DataTypes.STRING(128)
        },
        sort: {
            type: _sequelize.DataTypes.INTEGER
        },
        visible: {
            type: _sequelize.DataTypes.INTEGER,
            defaultValue: 1
        },
        redirect: {
            type: _sequelize.DataTypes.STRING(128)
        }
    }, {
        tableName: 'roles',
        sequelize
    });
    return MenuModel;
}

//# sourceMappingURL=menus.model.js.map