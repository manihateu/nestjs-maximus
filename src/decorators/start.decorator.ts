import { createListenerDecorator } from '../utils/create-listener-decorator.util';

/** Handler for /start command and bot_started event. */
export const Start = createListenerDecorator('start');
