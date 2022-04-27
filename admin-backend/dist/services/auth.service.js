"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _config = require("../config");
var _databases = _interopRequireDefault(require("../databases"));
var _httpException = require("../exceptions/HttpException");
var _util = require("../utils/util");
var _config1 = require("../config");
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
let AuthService = class AuthService {
    async signup(userData) {
        if ((0, _util).isEmpty(userData)) throw new _httpException.HttpException(400, '请求参数错误!');
        for(let item in userData){
            if (!userData[item]) {
                throw new _httpException.HttpException(400, `参数${item}不能为空！`);
            }
        }
        const findUserById = await this.users.findOne({
            where: {
                username: userData.username
            }
        });
        if (findUserById) throw new _httpException.HttpException(409, `用户名已存在`);
        const findUserByEmail = await this.users.findOne({
            where: {
                email: userData.email
            }
        });
        if (findUserByEmail) throw new _httpException.HttpException(409, `邮箱已存在`);
        const hashedPassword = await (0, _bcrypt).hash(userData.password, 10);
        const createUserData = await this.users.create(_objectSpread({}, userData, {
            password: hashedPassword
        }));
        return createUserData;
    }
    async login(userData) {
        if ((0, _util).isEmpty(userData)) throw new _httpException.HttpException(400, '用户名和密码不得为空');
        const findUser = await this.users.findOne({
            where: {
                username: userData.username
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, `用户名不存在`);
        const isPasswordMatching = await (0, _bcrypt).compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new _httpException.HttpException(409, '用户名或密码不匹配');
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return {
            token: tokenData.token,
            cookie,
            findUser
        };
    }
    async logout(userData) {
        if ((0, _util).isEmpty(userData)) throw new _httpException.HttpException(400, "You're not userData");
        const findUser = await this.users.findOne({
            where: {
                username: userData.username,
                password: userData.password
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = {
            id: user.id,
            username: user.username
        };
        const secretKey = _config.SECRET_KEY;
        var ref;
        const expiresIn = (ref = Number(_config1.EXPIRES_IN)) !== null && ref !== void 0 ? ref : 60 * 60;
        return {
            expiresIn,
            token: (0, _jsonwebtoken).sign(dataStoredInToken, secretKey, {
                expiresIn
            })
        };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
    constructor(){
        this.users = _databases.default.Users;
    }
};
var _default = AuthService;
exports.default = _default;

//# sourceMappingURL=auth.service.js.map