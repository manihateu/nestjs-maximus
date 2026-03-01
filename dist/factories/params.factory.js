"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximusParamsFactory = void 0;
const constants_1 = require("../constants");
const paramtype_enum_1 = require("../enums/paramtype.enum");
class MaximusParamsFactory {
    exchangeKeyForValue(type, data, args) {
        const ctx = args[0];
        switch (type) {
            case paramtype_enum_1.MaximusParamtype.CONTEXT:
                return ctx;
            case paramtype_enum_1.MaximusParamtype.MESSAGE:
                return data ? ctx[data] : ctx.text;
            default:
                return null;
        }
    }
    /** Build ordered array of param values for a handler method. */
    createParams(instance, methodName, ctx) {
        const meta = Reflect.getMetadata(constants_1.PARAM_ARGS_METADATA, instance.constructor, methodName);
        if (!meta || typeof meta !== 'object')
            return [ctx];
        const entries = Object.entries(meta)
            .filter(([k]) => /^\d+:\d+$/.test(k))
            .map(([k, v]) => {
            const type = parseInt(k.split(':')[0], 10);
            return { index: v.index, type, data: v.data };
        })
            .sort((a, b) => a.index - b.index);
        const args = [];
        for (const { type, data } of entries) {
            args.push(this.exchangeKeyForValue(type, data, [ctx]));
        }
        return args.length ? args : [ctx];
    }
}
exports.MaximusParamsFactory = MaximusParamsFactory;
