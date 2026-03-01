import { createMaximusParamDecorator } from '../utils/param-decorator.util';
import { MaximusParamtype } from '../enums/paramtype.enum';

/** Injects the current MaximusContext into a handler parameter. */
export const Context = createMaximusParamDecorator(MaximusParamtype.CONTEXT);
