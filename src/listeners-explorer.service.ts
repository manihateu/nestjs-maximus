import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Bot } from '@maxhub/max-bot-api';
import { MAXIMUS_MODULE_OPTIONS, MAXIMUS_BOT_NAME } from './constants';
import type { MaximusModuleOptions } from './maximus-options.interface';
import { MetadataAccessorService } from './services/metadata-accessor.service';
import { MaximusParamsFactory } from './factories/params.factory';
import { createContext } from './context';
import type { MaximusContext, MaximusReplyOptions } from './interfaces';

@Injectable()
export class ListenersExplorerService implements OnModuleInit {
  private readonly logger = new Logger(ListenersExplorerService.name);
  private bot: Bot | null = null;

  constructor(
    @Inject(MAXIMUS_BOT_NAME) bot: Bot,
    @Inject(MAXIMUS_MODULE_OPTIONS) private readonly options: MaximusModuleOptions,
    private readonly moduleRef: ModuleRef,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly paramsFactory: MaximusParamsFactory,
  ) {
    this.bot = bot;
  }

  onModuleInit() {
    if (!this.bot) return;
    if (this.options.commands?.length) {
      this.bot.api.setMyCommands(this.options.commands).catch((err) => this.logger.warn('setMyCommands failed', err));
    }
    this.bot.catch((err) => this.logger.error('MAX bot error', err));
    this.explore();
    this.bot.start();
    this.logger.log('MAX bot started');
  }

  private explore() {
    const include = this.options.include ?? [];
    for (const Cls of include) {
      if (!this.metadataAccessor.isUpdate(Cls)) continue;
      try {
        const instance = this.moduleRef.get(Cls as new (...args: unknown[]) => unknown, { strict: false });
        if (instance) this.registerListeners(instance, Cls);
      } catch (e) {
        this.logger.warn(`Could not get Update handler ${(Cls as { name?: string })?.name}`, e);
      }
    }
  }

  private registerListeners(instance: unknown, metatype: Function) {
    const prototype = Object.getPrototypeOf(instance) as Record<string, Function>;
    const metadataScanner = new MetadataScanner();
    metadataScanner.scanFromPrototype(instance as object, prototype, (methodName) => {
      this.registerIfListener(instance as object, prototype, methodName);
    });
  }

  private registerIfListener(instance: object, prototype: Record<string, Function>, methodName: string) {
    const methodRef = prototype[methodName];
    if (typeof methodRef !== 'function') return;
    const metadata = this.metadataAccessor.getListenerMetadata(methodRef as Function);
    if (!metadata?.length) return;

    for (const { method, args } of metadata) {
      const callback = this.createCallback(instance, prototype, methodName);
      if (method === 'start') {
        this.bot!.on('bot_started', callback);
        this.bot!.command('start', callback);
      } else if (method === 'help') {
        this.bot!.command('help', callback);
      } else if (method === 'on' && args[0]) {
        this.bot!.on(args[0] as 'bot_started' | 'message_created' | 'message_callback', callback);
      } else if (method === 'hears' && args[0] !== undefined) {
        const trigger = args[0];
        this.bot!.on('message_created', (raw: any) => {
          const ctx = this.createContext(raw);
          const text = ctx.text ?? '';
          const match = typeof trigger === 'string' ? text === trigger || text.startsWith(trigger) : trigger instanceof RegExp ? trigger.test(text) : false;
          if (match) return this.invokeHandler(instance, methodName, ctx);
        });
      }
    }
  }

  private createContext(raw: any): MaximusContext {
    return createContext(raw, (message: string, options?: MaximusReplyOptions) => this.reply(raw, message, options));
  }

  private async reply(raw: any, message: string, options?: MaximusReplyOptions): Promise<unknown> {
    const ctx = createContext(raw, () => Promise.resolve());
    const opts: Record<string, unknown> = {};
    if (options?.format) opts.format = options.format;
    if (options?.keyboard) opts.keyboard = options.keyboard;
    try {
      if (typeof (raw as any).reply === 'function') return (raw as any).reply(message, opts);
      if (this.bot?.api?.sendMessageToChat) return this.bot.api.sendMessageToChat(Number(ctx.chatId), message, opts);
      return this.bot!.api.sendMessageToUser(Number(ctx.chatId), message, opts);
    } catch (e) {
      this.logger.warn('Reply failed', e);
      throw e;
    }
  }

  private createCallback(instance: object, prototype: Record<string, Function>, methodName: string) {
    return (raw: any) => {
      const ctx = this.createContext(raw);
      return this.invokeHandler(instance, methodName, ctx);
    };
  }

  private async invokeHandler(instance: object, methodName: string, ctx: MaximusContext): Promise<unknown> {
    const params = this.paramsFactory.createParams(instance, methodName, ctx);
    const method = (instance as Record<string, Function>)[methodName];
    const result = await Promise.resolve(method.apply(instance, params));
    if (result != null && typeof result === 'string') await ctx.reply(result);
    return result;
  }
}
