import type { Module } from '@nestjs/core';
export declare class BaseExplorerService {
    getModules(modulesContainer: Map<unknown, Module>, include?: Function[]): Array<{
        metatype: Function;
        providers: Map<unknown, unknown>;
    }>;
    flatMap(modules: Array<{
        metatype: Function;
        providers: Map<unknown, unknown>;
        imports?: Set<unknown>;
    }>, callback: (wrapper: {
        instance: unknown;
        metatype: Function;
    }, moduleRef: unknown) => {
        instance: unknown;
        metatype: Function;
    } | undefined): Array<{
        instance: unknown;
        metatype: Function;
    }>;
}
//# sourceMappingURL=base-explorer.service.d.ts.map