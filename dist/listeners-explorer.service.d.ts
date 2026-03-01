import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Bot } from '@maxhub/max-bot-api';
import type { MaximusModuleOptions } from './maximus-options.interface';
import { MetadataAccessorService } from './services/metadata-accessor.service';
import { MaximusParamsFactory } from './factories/params.factory';
export declare class ListenersExplorerService implements OnModuleInit {
    private readonly options;
    private readonly moduleRef;
    private readonly metadataAccessor;
    private readonly paramsFactory;
    private readonly logger;
    private bot;
    constructor(bot: Bot, options: MaximusModuleOptions, moduleRef: ModuleRef, metadataAccessor: MetadataAccessorService, paramsFactory: MaximusParamsFactory);
    onModuleInit(): void;
    private explore;
    private registerListeners;
    private registerIfListener;
    private createContext;
    private reply;
    private createCallback;
    private invokeHandler;
}
//# sourceMappingURL=listeners-explorer.service.d.ts.map