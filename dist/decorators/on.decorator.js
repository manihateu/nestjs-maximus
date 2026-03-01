"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On = void 0;
const create_listener_decorator_util_1 = require("../utils/create-listener-decorator.util");
/** Registers handler for MAX event: 'bot_started' | 'message_created' | 'message_callback'. */
exports.On = (0, create_listener_decorator_util_1.createListenerDecorator)('on');
