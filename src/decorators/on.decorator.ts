import { createListenerDecorator } from '../utils/create-listener-decorator.util';
import type { MaxEventName } from '../constants';

/** Registers handler for MAX event: 'bot_started' | 'message_created' | 'message_callback'. */
export const On = createListenerDecorator('on') as (event: MaxEventName) => MethodDecorator;
