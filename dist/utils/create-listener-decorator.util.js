"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListenerDecorator = createListenerDecorator;
const constants_1 = require("../constants");
function createListenerDecorator(method) {
    return (...args) => {
        return (target, key, descriptor) => {
            const metadata = [{ method, args }];
            if (descriptor) {
                const previous = Reflect.getMetadata(constants_1.LISTENERS_METADATA, descriptor.value) || [];
                Reflect.defineMetadata(constants_1.LISTENERS_METADATA, [...previous, ...metadata], descriptor.value);
                return descriptor;
            }
            if (typeof target === 'function') {
                Reflect.defineMetadata(constants_1.LISTENERS_METADATA, metadata, target);
            }
        };
    };
}
