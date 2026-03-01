import { OnModuleInit } from '@nestjs/common';
import { Bot } from '@maxhub/max-bot-api';
import type { IMaximusUpdateHandler } from './interfaces';
export interface MaximusModuleOptions {
    token: string;
    /** Optional: set bot commands (e.g. [{ name: 'start', description: 'Start' }]) */
    commands?: Array<{
        name: string;
        description: string;
    }>;
}
export declare class MaximusService implements OnModuleInit {
    private readonly options;
    private readonly handler?;
    private readonly logger;
    private bot;
    constructor(options: MaximusModuleOptions, handler?: IMaximusUpdateHandler | undefined);
    onModuleInit(): void;
    private reply;
    private dispatchBotStarted;
    private dispatchCommand;
    private dispatchMessage;
    private dispatchCallback;
    /** Access the underlying Bot instance (e.g. for custom events). */
    getBot(): Bot | null;
}
//# sourceMappingURL=maximus.service.d.ts.map