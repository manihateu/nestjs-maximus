import type { MaximusContext } from '../interfaces';
export declare class MaximusParamsFactory {
    exchangeKeyForValue(type: number, data: string | undefined, args: [MaximusContext]): unknown;
    /** Build ordered array of param values for a handler method. */
    createParams(instance: object, methodName: string, ctx: MaximusContext): unknown[];
}
//# sourceMappingURL=params.factory.d.ts.map