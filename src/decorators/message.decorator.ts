import { createMaximusParamDecorator } from '../utils/param-decorator.util';
import { MaximusParamtype } from '../enums/paramtype.enum';

/** Injects the message text (ctx.text) or a message property. */
export const Message = createMaximusParamDecorator(MaximusParamtype.MESSAGE);
