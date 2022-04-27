"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stream = exports.logger = void 0;
var _fs = require("fs");
var _path = require("path");
var _winston = _interopRequireDefault(require("winston"));
var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));
var _config = require("../config");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const logDir = (0, _path).join(__dirname, _config.LOG_DIR);
if (!(0, _fs).existsSync(logDir)) {
    (0, _fs).mkdirSync(logDir);
}
const logFormat = _winston.default.format.printf(({ timestamp , level , message  })=>`${timestamp} ${level}: ${message}`
);
const logger = _winston.default.createLogger({
    format: _winston.default.format.combine(_winston.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), logFormat),
    transports: [
        new _winstonDailyRotateFile.default({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true
        }),
        new _winstonDailyRotateFile.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true
        }), 
    ]
});
exports.logger = logger;
logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.splat(), _winston.default.format.colorize())
}));
const stream = {
    write: (message)=>{
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};
exports.stream = stream;

//# sourceMappingURL=logger.js.map