"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
/**
 * Marks a class as a MAX update handler (like @Controller in NestJS).
 * Methods decorated with @Start(), @Help(), @On(), @Hears() will be registered with the bot.
 */
const Update = () => (0, common_1.SetMetadata)(constants_1.UPDATE_METADATA, true);
exports.Update = Update;
