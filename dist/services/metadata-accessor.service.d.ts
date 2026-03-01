import { Reflector } from '@nestjs/core';
import type { ListenerMetadata } from '../interfaces/listener-metadata.interface';
export declare class MetadataAccessorService {
    private readonly reflector;
    constructor(reflector: Reflector);
    isUpdate(target: unknown): boolean;
    getListenerMetadata(target: Function): ListenerMetadata[] | undefined;
}
//# sourceMappingURL=metadata-accessor.service.d.ts.map