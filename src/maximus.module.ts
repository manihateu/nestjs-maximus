import { DynamicModule, Module } from '@nestjs/common';
import { Bot } from '@maxhub/max-bot-api';
import { MAXIMUS_MODULE_OPTIONS, MAXIMUS_BOT_NAME } from './constants';
import type { MaximusModuleOptions } from './maximus-options.interface';
import { MetadataAccessorService } from './services/metadata-accessor.service';
import { MaximusParamsFactory } from './factories/params.factory';
import { ListenersExplorerService } from './listeners-explorer.service';

@Module({})
export class MaximusModule {
  static forRoot(options: MaximusModuleOptions): DynamicModule {
    return {
      module: MaximusModule,
      global: false,
      providers: [
        { provide: MAXIMUS_MODULE_OPTIONS, useValue: options },
        {
          provide: MAXIMUS_BOT_NAME,
          useFactory: (opts: MaximusModuleOptions) => new Bot(opts.token),
          inject: [MAXIMUS_MODULE_OPTIONS],
        },
        MetadataAccessorService,
        MaximusParamsFactory,
        ListenersExplorerService,
      ],
      exports: [MAXIMUS_BOT_NAME],
    };
  }

  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<MaximusModuleOptions> | MaximusModuleOptions;
    inject?: any[];
    imports?: any[];
  }): DynamicModule {
    return {
      module: MaximusModule,
      global: false,
      imports: options.imports ?? [],
      providers: [
        {
          provide: MAXIMUS_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        {
          provide: MAXIMUS_BOT_NAME,
          useFactory: (opts: MaximusModuleOptions) => new Bot(opts.token),
          inject: [MAXIMUS_MODULE_OPTIONS],
        },
        MetadataAccessorService,
        MaximusParamsFactory,
        ListenersExplorerService,
      ],
      exports: [MAXIMUS_BOT_NAME],
    };
  }
}
