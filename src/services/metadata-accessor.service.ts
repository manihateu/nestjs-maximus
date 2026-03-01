import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UPDATE_METADATA, LISTENERS_METADATA } from '../constants';
import type { ListenerMetadata } from '../interfaces/listener-metadata.interface';

@Injectable()
export class MetadataAccessorService {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: unknown): boolean {
    if (!target || typeof target !== 'function') return false;
    return !!this.reflector.get<boolean>(UPDATE_METADATA, target);
  }

  getListenerMetadata(target: Function): ListenerMetadata[] | undefined {
    return this.reflector.get<ListenerMetadata[]>(LISTENERS_METADATA, target);
  }
}
