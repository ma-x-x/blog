"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
let UserModel = class UserModel extends _sequelize.Model {
};
exports.UserModel = UserModel;
function _default(sequelize) {
    UserModel.init({
        id: {
            autoIncrement: true,
            type: _sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        nickname: {
            type: _sequelize.DataTypes.STRING(64)
        },
        username: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(45),
            unique: true
        },
        password: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(255)
        },
        email: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(128),
            unique: true
        },
        gender: {
            type: _sequelize.DataTypes.INTEGER
        },
        avatar: {
            type: _sequelize.DataTypes.STRING(255)
        },
        mobile: {
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
        tableName: 'users',
        sequelize
    });
    return UserModel;
}

//# sourceMappingURL=users.model.js.map