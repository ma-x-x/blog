"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateRoleDto = void 0;
var _classValidator = require("class-validator");
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator ? decorator(target, property, desc) || desc : desc;
    }, desc);
    var hasAccessor = Object.prototype.hasOwnProperty.call(desc, 'get') || Object.prototype.hasOwnProperty.call(desc, 'set');
    if (context && desc.initializer !== void 0 && !hasAccessor) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (hasAccessor) {
        delete desc.writable;
        delete desc.initializer;
        delete desc.value;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target, property, desc);
        desc = null;
    }
    return desc;
}
function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
var _class, _descriptor, _dec, _dec1, _descriptor1, _dec2, _dec3, _descriptor2, _dec4, _dec5, _descriptor3, _dec6, _dec7, _descriptor4, _dec8, _dec9, _descriptor5, _dec10, _dec11;
let CreateRoleDto = ((_class = class CreateRoleDto {
    constructor(){
        _initializerDefineProperty(this, "id", _descriptor, this);
        _initializerDefineProperty(this, "name", _descriptor1, this);
        _initializerDefineProperty(this, "code", _descriptor2, this);
        _initializerDefineProperty(this, "sort", _descriptor3, this);
        _initializerDefineProperty(this, "status", _descriptor4, this);
        _initializerDefineProperty(this, "deleted", _descriptor5, this);
    }
}) || _class, _dec = (0, _classValidator).IsNumber(), _dec1 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Number), _dec2 = (0, _classValidator).IsString(), _dec3 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", String), _dec4 = (0, _classValidator).IsString(), _dec5 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", String), _dec6 = (0, _classValidator).IsNumber(), _dec7 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Number), _dec8 = (0, _classValidator).IsNumber(), _dec9 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Number), _dec10 = (0, _classValidator).IsNumber(), _dec11 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Number), _descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [
    _dec,
    _dec1
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class.prototype, "name", [
    _dec2,
    _dec3
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "code", [
    _dec4,
    _dec5
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "sort", [
    _dec6,
    _dec7
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "status", [
    _dec8,
    _dec9
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "deleted", [
    _dec10,
    _dec11
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
}), _class);
exports.CreateRoleDto = CreateRoleDto;

//# sourceMappingURL=roles.dto.js.map