/**
 * Normalized context for MAX bot updates.
 * Abstracts @maxhub/max-bot-api raw context for use in NestJS handlers.
 */
export interface MaximusContext {
  /** Platform user id (string) */
  userId: string;
  /** Chat id (string); in 1:1 equals userId */
  chatId: string;
  /** Message text, if present */
  text?: string;
  /** Callback payload for message_callback */
  callbackPayload?: string;
  /** Raw context from @maxhub/max-bot-api for advanced use */
  raw: unknown;

  /**
   * Send a reply into the current chat.
   * @param message - Text to send
   * @param options - Optional: format ('markdown' | 'html'), keyboard (from Keyboard.inlineKeyboard(...))
   */
  reply(message: string, options?: MaximusReplyOptions): Promise<unknown>;
}

export interface MaximusReplyOptions {
  format?: 'markdown' | 'html';
  keyboard?: unknown;
}

/**
 * Implement this interface and provide it as MAXIMUS_UPDATE_HANDLER
 * to handle MAX bot events.
 */
export interface IMaximusUpdateHandler {
  onBotStarted?(ctx: MaximusContext): Promise<void> | void;
  onCommand?(ctx: MaximusContext, commandName: string): Promise<void> | void;
  onMessage?(ctx: MaximusContext): Promise<void> | void;
  onCallback?(ctx: MaximusContext): Promise<void> | void;
}

export const MAXIMUS_UPDATE_HANDLER = Symbol('MAXIMUS_UPDATE_HANDLER');
