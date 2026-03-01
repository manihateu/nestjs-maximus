"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotToken = getBotToken;
const constants_1 = require("../constants");
/** Returns the DI token for the Bot instance (for @InjectBot()). */
function getBotToken(name) {
    if (!name || name === constants_1.DEFAULT_BOT_NAME)
        return constants_1.MAXIMUS_BOT_NAME;
    return `${name}Bot`;
}
