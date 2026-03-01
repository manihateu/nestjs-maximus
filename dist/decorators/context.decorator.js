"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const param_decorator_util_1 = require("../utils/param-decorator.util");
const paramtype_enum_1 = require("../enums/paramtype.enum");
/** Injects the current MaximusContext into a handler parameter. */
exports.Context = (0, param_decorator_util_1.createMaximusParamDecorator)(paramtype_enum_1.MaximusParamtype.CONTEXT);
