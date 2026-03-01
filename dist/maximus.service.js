"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MaximusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximusService = void 0;
const common_1 = require("@nestjs/common");
const max_bot_api_1 = require("@maxhub/max-bot-api");
const interfaces_1 = require("./interfaces");
const context_1 = require("./context");
let MaximusService = MaximusService_1 = class MaximusService {
    constructor(options, handler) {
        this.options = options;
        this.handler = handler;
        this.logger = new common_1.Logger(MaximusService_1.name);
        this.bot = null;
    }
    onModuleInit() {
        if (!this.options.token) {
            this.logger.warn('MAX bot token is empty — MAX bot will not start.');
            return;
        }
        this.bot = new max_bot_api_1.Bot(this.options.token);
        if (this.options.commands?.length) {
            this.bot.api.setMyCommands(this.options.commands).catch((err) => this.logger.warn('setMyCommands failed', err));
        }
        this.bot.on('bot_started', (raw) => this.dispatchBotStarted(raw));
        this.bot.command('start', (raw) => this.dispatchCommand(raw, 'start'));
        this.bot.on('message_created', (raw) => this.dispatchMessage(raw));
        this.bot.on('message_callback', (raw) => this.dispatchCallback(raw));
        this.bot.catch((err) => this.logger.error('MAX bot error', err));
        this.bot.start();
        this.logger.log('MAX bot started');
    }
    async reply(raw, message, options) {
        const ctx = (0, context_1.createContext)(raw, () => Promise.resolve());
        const chatId = ctx.chatId;
        const opts = {};
        if (options?.format)
            opts.format = options.format;
        if (options?.keyboard)
            opts.keyboard = options.keyboard;
        try {
            if (typeof raw.reply === 'function') {
                return raw.reply(message, opts);
            }
            if (this.bot?.api?.sendMessageToChat) {
                return this.bot.api.sendMessageToChat(Number(chatId), message, opts);
            }
            return this.bot.api.sendMessageToUser(Number(chatId), message, opts);
        }
        catch (e) {
            this.logger.warn('Reply failed', e);
            throw e;
        }
    }
    async dispatchBotStarted(raw) {
        const ctx = (0, context_1.createContext)(raw, (msg, opt) => this.reply(raw, msg, opt));
        if (this.handler?.onBotStarted) {
            await Promise.resolve(this.handler.onBotStarted(ctx)).catch((e) => this.logger.error('onBotStarted error', e));
        }
    }
    async dispatchCommand(raw, commandName) {
        const ctx = (0, context_1.createContext)(raw, (msg, opt) => this.reply(raw, msg, opt));
        if (this.handler?.onCommand) {
            await Promise.resolve(this.handler.onCommand(ctx, commandName)).catch((e) => this.logger.error('onCommand error', e));
        }
    }
    async dispatchMessage(raw) {
        const ctx = (0, context_1.createContext)(raw, (msg, opt) => this.reply(raw, msg, opt));
        if (this.handler?.onMessage) {
            await Promise.resolve(this.handler.onMessage(ctx)).catch((e) => this.logger.error('onMessage error', e));
        }
    }
    async dispatchCallback(raw) {
        const ctx = (0, context_1.createContext)(raw, (msg, opt) => this.reply(raw, msg, opt));
        if (this.handler?.onCallback) {
            await Promise.resolve(this.handler.onCallback(ctx)).catch((e) => this.logger.error('onCallback error', e));
        }
    }
    /** Access the underlying Bot instance (e.g. for custom events). */
    getBot() {
        return this.bot;
    }
};
exports.MaximusService = MaximusService;
exports.MaximusService = MaximusService = MaximusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.MAXIMUS_MODULE_OPTIONS)),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(interfaces_1.MAXIMUS_UPDATE_HANDLER)),
    __metadata("design:paramtypes", [Object, Object])
], MaximusService);
