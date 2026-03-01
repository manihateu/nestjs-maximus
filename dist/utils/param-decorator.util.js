"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaximusParamDecorator = createMaximusParamDecorator;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
function createMaximusParamDecorator(paramtype) {
    return (data) => (target, key, index) => {
        const args = Reflect.getMetadata(constants_1.PARAM_ARGS_METADATA, target.constructor, key) || {};
        Reflect.defineMetadata(constants_1.PARAM_ARGS_METADATA, (0, common_1.assignMetadata)(args, paramtype, index, data), target.constructor, key);
    };
}
