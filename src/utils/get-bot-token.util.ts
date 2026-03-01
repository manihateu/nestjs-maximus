import { DEFAULT_BOT_NAME, MAXIMUS_BOT_NAME } from '../constants';

/** Returns the DI token for the Bot instance (for @InjectBot()). */
export function getBotToken(name?: string): string {
  if (!name || name === DEFAULT_BOT_NAME) return MAXIMUS_BOT_NAME;
  return `${name}Bot`;
}
