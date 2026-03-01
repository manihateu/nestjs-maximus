import { assignMetadata } from '@nestjs/common';
import { PARAM_ARGS_METADATA } from '../constants';
import { MaximusParamtype } from '../enums/paramtype.enum';

export function createMaximusParamDecorator(paramtype: MaximusParamtype) {
  return (data?: string) => (target: object, key: string | symbol, index: number) => {
    const args = Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
    Reflect.defineMetadata(
      PARAM_ARGS_METADATA,
      assignMetadata(args, paramtype, index, data),
      target.constructor,
      key,
    );
  };
}
