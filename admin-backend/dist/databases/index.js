"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _config = require("../config");
var _usersModel = _interopRequireDefault(require("../models/users.model"));
var _logger = require("../utils/logger");
var _rolesModel = _interopRequireDefault(require("../models/roles.model"));
var _menusModel = _interopRequireDefault(require("../models/menus.model"));
var _permissionsModel = _interopRequireDefault(require("../models/permissions.model"));
var _dictsModel = _interopRequireDefault(require("../models/dicts.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sequelize = new _sequelize.default.Sequelize(_config.DB_DATABASE, _config.DB_USER, _config.DB_PASSWORD, {
    dialect: 'mysql',
    host: _config.DB_HOST,
    port: Number(_config.DB_PORT),
    timezone: '+09:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true
    },
    pool: {
        min: 0,
        max: 5
    },
    logQueryParameters: _config.NODE_ENV === 'development',
    logging: (query, time)=>{
        _logger.logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true
});
sequelize.authenticate();
const DB = {
    Users: (0, _usersModel).default(sequelize),
    Roles: (0, _rolesModel).default(sequelize),
    Menus: (0, _menusModel).default(sequelize),
    Dicts: (0, _dictsModel).default(sequelize),
    Permissions: (0, _permissionsModel).default(sequelize),
    sequelize,
    Sequelize: _sequelize.default
};
DB.Users.belongsToMany(DB.Roles, {
    through: 'Users_Roles',
    as: 'roles',
    timestamps: false
});
DB.Roles.belongsToMany(DB.Users, {
    through: 'Users_Roles',
    as: 'users',
    timestamps: false
});
DB.Roles.belongsToMany(DB.Menus, {
    through: 'Roles_Menus',
    as: 'menus',
    timestamps: false
});
DB.Menus.belongsToMany(DB.Roles, {
    through: 'Roles_Menus',
    as: 'roles',
    timestamps: false
});
DB.Roles.belongsToMany(DB.Permissions, {
    through: 'Roles_Permissions',
    as: 'permissions',
    timestamps: false
});
DB.Permissions.belongsToMany(DB.Roles, {
    through: 'Roles_Permissions',
    as: 'roles',
    timestamps: false
});
var _default = DB;
exports.default = _default;

//# sourceMappingURL=index.js.map