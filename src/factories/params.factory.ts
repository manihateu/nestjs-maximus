import { PARAM_ARGS_METADATA } from '../constants';
import { MaximusParamtype } from '../enums/paramtype.enum';
import type { MaximusContext } from '../interfaces';

export class MaximusParamsFactory {
  exchangeKeyForValue(type: number, data: string | undefined, args: [MaximusContext]): unknown {
    const ctx = args[0];
    switch (type) {
      case MaximusParamtype.CONTEXT:
        return ctx;
      case MaximusParamtype.MESSAGE:
        return data ? (ctx as unknown as Record<string, unknown>)[data] : ctx.text;
      default:
        return null;
    }
  }

  /** Build ordered array of param values for a handler method. */
  createParams(instance: object, methodName: string, ctx: MaximusContext): unknown[] {
    const meta = Reflect.getMetadata(PARAM_ARGS_METADATA, instance.constructor, methodName) as Record<
      string,
      { index: number; data?: string }
    > | undefined;
    if (!meta || typeof meta !== 'object') return [ctx];
    const entries = Object.entries(meta)
      .filter(([k]) => /^\d+:\d+$/.test(k))
      .map(([k, v]) => {
        const type = parseInt(k.split(':')[0], 10);
        return { index: v.index, type, data: v.data };
      })
      .sort((a, b) => a.index - b.index);
    const args: unknown[] = [];
    for (const { type, data } of entries) {
      args.push(this.exchangeKeyForValue(type, data, [ctx]));
    }
    return args.length ? args : [ctx];
  }
}
