"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _bcrypt = require("bcrypt");
var _databases = _interopRequireDefault(require("../databases"));
var _httpException = require("../exceptions/HttpException");
var _util = require("../utils/util");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
let UserService = class UserService {
    async findAllUser() {
        const allUser = await this.users.findAll({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            order: [
                [
                    'id',
                    'DESC'
                ]
            ]
        });
        return allUser;
    }
    async findCurrentUser(userId) {
        if ((0, _util).isEmpty(userId)) throw new _httpException.HttpException(400, "You're not userId");
        const findUser = await this.users.findOne({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            include: [
                {
                    model: _databases.default.Roles,
                    as: 'roles',
                    through: {
                        attributes: []
                    }
                }, 
            ],
            where: {
                id: 1
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        return findUser;
    }
    async findUserById(username) {
        if ((0, _util).isEmpty(username)) throw new _httpException.HttpException(400, "You're not username");
        const findUser = await this.users.findOne({
            attributes: {
                exclude: [
                    'password'
                ]
            },
            where: {
                username
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        return findUser;
    }
    async findMenusById(userId) {
        const findUser = await this.users.findOne({
            include: [
                {
                    model: _databases.default.Roles,
                    as: 'roles',
                    through: {
                        attributes: []
                    },
                    include: [
                        {
                            model: _databases.default.Menus,
                            through: {
                                attributes: []
                            }
                        }, 
                    ]
                }, 
            ],
            where: {
                id: 1
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        return findUser;
    }
    async createUser(userData) {
        if ((0, _util).isEmpty(userData)) throw new _httpException.HttpException(400, "You're not userData");
        const findUser = await this.users.findOne({
            where: {
                email: userData.email
            }
        });
        if (findUser) throw new _httpException.HttpException(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await (0, _bcrypt).hash(userData.password, 10);
        const createUserData = await this.users.create(_objectSpread({}, userData, {
            password: hashedPassword
        }));
        return createUserData;
    }
    async updateUser(username, userData) {
        if ((0, _util).isEmpty(userData)) throw new _httpException.HttpException(400, "You're not userData");
        const findUser = await this.users.findByPk(username);
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        const hashedPassword = await (0, _bcrypt).hash(userData.password, 10);
        await this.users.update(_objectSpread({}, userData, {
            password: hashedPassword
        }), {
            where: {
                id: username
            }
        });
        const updateUser = await this.users.findByPk(username);
        return updateUser;
    }
    async deleteUser(username) {
        if ((0, _util).isEmpty(username)) throw new _httpException.HttpException(400, "You're not username");
        const findUser = await this.users.findByPk(username);
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        await this.users.destroy({
            where: {
                id: username
            }
        });
        return findUser;
    }
    constructor(){
        this.users = _databases.default.Users;
        this.roles = _databases.default.Roles;
    }
};
var _default = UserService;
exports.default = _default;

//# sourceMappingURL=users.service.js.map