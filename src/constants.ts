import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export const MAXIMUS_MODULE_OPTIONS = 'MAXIMUS_MODULE_OPTIONS';
export const MAXIMUS_BOT_NAME = 'MAXIMUS_BOT';
export const DEFAULT_BOT_NAME = 'DefaultMaximusBot';
export const UPDATE_METADATA = 'MAXIMUS_UPDATE_METADATA';
export const LISTENERS_METADATA = 'MAXIMUS_LISTENERS_METADATA';
export const PARAM_ARGS_METADATA = ROUTE_ARGS_METADATA;

export const MAX_EVENTS = ['bot_started', 'message_created', 'message_callback'] as const;
export type MaxEventName = (typeof MAX_EVENTS)[number];
