"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hears = void 0;
const create_listener_decorator_util_1 = require("../utils/create-listener-decorator.util");
/** Registers handler for text messages matching the pattern (string or RegExp). */
exports.Hears = (0, create_listener_decorator_util_1.createListenerDecorator)('hears');
