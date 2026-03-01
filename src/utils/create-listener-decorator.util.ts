import { LISTENERS_METADATA } from '../constants';
import type { ListenerMetadata } from '../interfaces/listener-metadata.interface';

export function createListenerDecorator(method: string) {
  return (...args: unknown[]) => {
    return (target: object, key?: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | void => {
      const metadata: ListenerMetadata[] = [{ method, args }];
      if (descriptor) {
        const previous = Reflect.getMetadata(LISTENERS_METADATA, descriptor.value) || [];
        Reflect.defineMetadata(LISTENERS_METADATA, [...previous, ...metadata], descriptor.value);
        return descriptor;
      }
      if (typeof target === 'function') {
        Reflect.defineMetadata(LISTENERS_METADATA, metadata, target);
      }
    };
  };
}
