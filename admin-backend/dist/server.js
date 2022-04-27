"use strict";
var _app = _interopRequireDefault(require("./app"));
var _indexRoute = _interopRequireDefault(require("./routes/index.route"));
var _validateEnv = _interopRequireDefault(require("./utils/validateEnv"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _validateEnv).default();
const app = new _app.default(_indexRoute.default);
process.on('unhandledRejection', (reason, p)=>{
    console.log('Promise: ', p, 'Reason: ', reason);
});
app.listen();

//# sourceMappingURL=server.js.map