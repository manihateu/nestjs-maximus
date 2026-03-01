import { createListenerDecorator } from '../utils/create-listener-decorator.util';

/** Registers handler for text messages matching the pattern (string or RegExp). */
export const Hears = createListenerDecorator('hears');
