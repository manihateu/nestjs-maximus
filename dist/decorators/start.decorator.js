"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Start = void 0;
const create_listener_decorator_util_1 = require("../utils/create-listener-decorator.util");
/** Handler for /start command and bot_started event. */
exports.Start = (0, create_listener_decorator_util_1.createListenerDecorator)('start');
