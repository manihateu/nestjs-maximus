"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectBot = void 0;
const common_1 = require("@nestjs/common");
const get_bot_token_util_1 = require("../utils/get-bot-token.util");
/**
 * Injects the MAX Bot instance.
 * @param botName - Optional bot name when using multiple bots (same as in module options).
 * @example
 * @InjectBot() private bot: Bot
 * @InjectBot('myBot') private bot: Bot
 */
const InjectBot = (botName) => (0, common_1.Inject)((0, get_bot_token_util_1.getBotToken)(botName));
exports.InjectBot = InjectBot;
