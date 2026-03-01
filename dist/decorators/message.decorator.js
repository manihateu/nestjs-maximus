"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const param_decorator_util_1 = require("../utils/param-decorator.util");
const paramtype_enum_1 = require("../enums/paramtype.enum");
/** Injects the message text (ctx.text) or a message property. */
exports.Message = (0, param_decorator_util_1.createMaximusParamDecorator)(paramtype_enum_1.MaximusParamtype.MESSAGE);
