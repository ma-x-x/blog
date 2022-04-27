"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatResultData = void 0;
const formatResultData = (result, message = 'success')=>{
    return {
        code: '00000',
        data: result,
        message: message
    };
};
exports.formatResultData = formatResultData;

//# sourceMappingURL=formatResult.js.map