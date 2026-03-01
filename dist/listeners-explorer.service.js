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
var ListenersExplorerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenersExplorerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const max_bot_api_1 = require("@maxhub/max-bot-api");
const constants_1 = require("./constants");
const metadata_accessor_service_1 = require("./services/metadata-accessor.service");
const params_factory_1 = require("./factories/params.factory");
const context_1 = require("./context");
let ListenersExplorerService = ListenersExplorerService_1 = class ListenersExplorerService {
    constructor(bot, options, moduleRef, metadataAccessor, paramsFactory) {
        this.options = options;
        this.moduleRef = moduleRef;
        this.metadataAccessor = metadataAccessor;
        this.paramsFactory = paramsFactory;
        this.logger = new common_1.Logger(ListenersExplorerService_1.name);
        this.bot = null;
        this.bot = bot;
    }
    onModuleInit() {
        if (!this.bot)
            return;
        if (this.options.commands?.length) {
            this.bot.api.setMyCommands(this.options.commands).catch((err) => this.logger.warn('setMyCommands failed', err));
        }
        this.bot.catch((err) => this.logger.error('MAX bot error', err));
        this.explore();
        this.bot.start();
        this.logger.log('MAX bot started');
    }
    explore() {
        const include = this.options.include ?? [];
        for (const Cls of include) {
            if (!this.metadataAccessor.isUpdate(Cls))
                continue;
            try {
                const instance = this.moduleRef.get(Cls, { strict: false });
                if (instance)
                    this.registerListeners(instance, Cls);
            }
            catch (e) {
                this.logger.warn(`Could not get Update handler ${Cls?.name}`, e);
            }
        }
    }
    registerListeners(instance, metatype) {
        const prototype = Object.getPrototypeOf(instance);
        const metadataScanner = new metadata_scanner_1.MetadataScanner();
        metadataScanner.scanFromPrototype(instance, prototype, (methodName) => {
            this.registerIfListener(instance, prototype, methodName);
        });
    }
    registerIfListener(instance, prototype, methodName) {
        const methodRef = prototype[methodName];
        if (typeof methodRef !== 'function')
            return;
        const metadata = this.metadataAccessor.getListenerMetadata(methodRef);
        if (!metadata?.length)
            return;
        for (const { method, args } of metadata) {
            const callback = this.createCallback(instance, prototype, methodName);
            if (method === 'start') {
                this.bot.on('bot_started', callback);
                this.bot.command('start', callback);
            }
            else if (method === 'help') {
                this.bot.command('help', callback);
            }
            else if (method === 'on' && args[0]) {
                this.bot.on(args[0], callback);
            }
            else if (method === 'hears' && args[0] !== undefined) {
                const trigger = args[0];
                this.bot.on('message_created', (raw) => {
                    const ctx = this.createContext(raw);
                    const text = ctx.text ?? '';
                    const match = typeof trigger === 'string' ? text === trigger || text.startsWith(trigger) : trigger instanceof RegExp ? trigger.test(text) : false;
                    if (match)
                        return this.invokeHandler(instance, methodName, ctx);
                });
            }
        }
    }
    createContext(raw) {
        return (0, context_1.createContext)(raw, (message, options) => this.reply(raw, message, options));
    }
    async reply(raw, message, options) {
        const ctx = (0, context_1.createContext)(raw, () => Promise.resolve());
        const opts = {};
        if (options?.format)
            opts.format = options.format;
        if (options?.keyboard)
            opts.keyboard = options.keyboard;
        try {
            if (typeof raw.reply === 'function')
                return raw.reply(message, opts);
            if (this.bot?.api?.sendMessageToChat)
                return this.bot.api.sendMessageToChat(Number(ctx.chatId), message, opts);
            return this.bot.api.sendMessageToUser(Number(ctx.chatId), message, opts);
        }
        catch (e) {
            this.logger.warn('Reply failed', e);
            throw e;
        }
    }
    createCallback(instance, prototype, methodName) {
        return (raw) => {
            const ctx = this.createContext(raw);
            return this.invokeHandler(instance, methodName, ctx);
        };
    }
    async invokeHandler(instance, methodName, ctx) {
        const params = this.paramsFactory.createParams(instance, methodName, ctx);
        const method = instance[methodName];
        const result = await Promise.resolve(method.apply(instance, params));
        if (result != null && typeof result === 'string')
            await ctx.reply(result);
        return result;
    }
};
exports.ListenersExplorerService = ListenersExplorerService;
exports.ListenersExplorerService = ListenersExplorerService = ListenersExplorerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MAXIMUS_BOT_NAME)),
    __param(1, (0, common_1.Inject)(constants_1.MAXIMUS_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [max_bot_api_1.Bot, Object, core_1.ModuleRef,
        metadata_accessor_service_1.MetadataAccessorService,
        params_factory_1.MaximusParamsFactory])
], ListenersExplorerService);
