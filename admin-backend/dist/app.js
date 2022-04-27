"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _compression = _interopRequireDefault(require("compression"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _hpp = _interopRequireDefault(require("hpp"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _config = require("./config");
var _databases = _interopRequireDefault(require("./databases"));
var _errorMiddleware = _interopRequireDefault(require("./middlewares/error.middleware"));
var _authJwtToken = _interopRequireWildcard(require("./middlewares/auth.jwtToken"));
var _expressJwt = _interopRequireDefault(require("express-jwt"));
var _logger = require("./utils/logger");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
let App = class App {
    listen() {
        this.app.listen(this.port, ()=>{
            _logger.logger.info(`=================================`);
            _logger.logger.info(`======= ENV: ${this.env} =======`);
            _logger.logger.info(`🚀 App listening on the port ${this.port}`);
            _logger.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        _databases.default.sequelize.sync({
            force: false
        });
    }
    initializeMiddlewares() {
        this.app.use((0, _morgan).default(_config.LOG_FORMAT, {
            stream: _logger.stream
        }));
        this.app.use((0, _cors).default({
            origin: _config.ORIGIN,
            credentials: _config.CREDENTIALS
        }));
        this.app.use((0, _hpp).default());
        this.app.use((0, _helmet).default());
        this.app.use((0, _compression).default());
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        this.app.use((0, _cookieParser).default());
        this.app.use((0, _authJwtToken).default());
        this.app.use((0, _expressJwt).default({
            credentialsRequired: false,
            secret: _config.SECRET_KEY,
            algorithms: [
                'HS256'
            ]
        }).unless({
            path: _authJwtToken.jwtUnlessPath
        }));
    }
    initializeRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs'
                }
            },
            apis: [
                'swagger.yaml'
            ]
        };
        const specs = (0, _swaggerJsdoc).default(options);
        this.app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(_errorMiddleware.default);
    }
    constructor(routes){
        this.app = (0, _express).default();
        this.env = _config.NODE_ENV || 'development';
        this.port = _config.PORT || 8000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
};
var _default = App;
exports.default = _default;

//# sourceMappingURL=app.js.map