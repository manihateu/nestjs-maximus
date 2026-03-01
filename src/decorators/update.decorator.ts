import { SetMetadata } from '@nestjs/common';
import { UPDATE_METADATA } from '../constants';

/**
 * Marks a class as a MAX update handler (like @Controller in NestJS).
 * Methods decorated with @Start(), @Help(), @On(), @Hears() will be registered with the bot.
 */
export const Update = (): ClassDecorator => SetMetadata(UPDATE_METADATA, true);
