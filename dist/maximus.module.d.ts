import { DynamicModule } from '@nestjs/common';
import type { MaximusModuleOptions } from './maximus-options.interface';
export declare class MaximusModule {
    static forRoot(options: MaximusModuleOptions): DynamicModule;
    static forRootAsync(options: {
        useFactory: (...args: any[]) => Promise<MaximusModuleOptions> | MaximusModuleOptions;
        inject?: any[];
        imports?: any[];
    }): DynamicModule;
}
//# sourceMappingURL=maximus.module.d.ts.map