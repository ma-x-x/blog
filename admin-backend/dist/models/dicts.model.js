"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
let DictModel = class DictModel extends _sequelize.Model {
};
exports.DictModel = DictModel;
function _default(sequelize) {
    DictModel.init({
        id: {
            autoIncrement: true,
            type: _sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(64)
        },
        value: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(64)
        },
        dictCode: {
            type: _sequelize.DataTypes.STRING(64)
        },
        sort: {
            type: _sequelize.DataTypes.INTEGER
        },
        status: {
            type: _sequelize.DataTypes.INTEGER,
            defaultValue: 1
        },
        defaulted: {
            type: _sequelize.DataTypes.INTEGER,
            defaultValue: 0
        },
        remark: {
            type: _sequelize.DataTypes.STRING(128)
        }
    }, {
        tableName: 'roles',
        sequelize
    });
    return DictModel;
}

//# sourceMappingURL=dicts.model.js.map