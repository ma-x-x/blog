"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.EXPIRES_IN = exports.SECRET_KEY = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
var _dotenv = require("dotenv");
(0, _dotenv).config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});
const CREDENTIALS = process.env.CREDENTIALS === 'true';
exports.CREDENTIALS = CREDENTIALS;
const { NODE_ENV , PORT , DB_HOST , DB_PORT , DB_USER , DB_PASSWORD , DB_DATABASE , SECRET_KEY , EXPIRES_IN , LOG_FORMAT , LOG_DIR , ORIGIN ,  } = process.env;
exports.NODE_ENV = NODE_ENV;
exports.PORT = PORT;
exports.DB_HOST = DB_HOST;
exports.DB_PORT = DB_PORT;
exports.DB_USER = DB_USER;
exports.DB_PASSWORD = DB_PASSWORD;
exports.DB_DATABASE = DB_DATABASE;
exports.SECRET_KEY = SECRET_KEY;
exports.EXPIRES_IN = EXPIRES_IN;
exports.LOG_FORMAT = LOG_FORMAT;
exports.LOG_DIR = LOG_DIR;
exports.ORIGIN = ORIGIN;

//# sourceMappingURL=index.js.map