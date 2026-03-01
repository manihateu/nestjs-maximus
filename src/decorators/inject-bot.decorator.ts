import { Inject } from '@nestjs/common';
import { getBotToken } from '../utils/get-bot-token.util';
import type { Bot } from '@maxhub/max-bot-api';

/**
 * Injects the MAX Bot instance.
 * @param botName - Optional bot name when using multiple bots (same as in module options).
 * @example
 * @InjectBot() private bot: Bot
 * @InjectBot('myBot') private bot: Bot
 */
export const InjectBot = (botName?: string): ParameterDecorator => Inject(getBotToken(botName)) as ParameterDecorator;
