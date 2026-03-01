"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
function getIds(raw) {
    const msg = raw.message ?? raw.update?.message;
    const body = msg?.body ?? msg ?? raw;
    const userId = String(body?.sender?.id ?? body?.userId ?? raw.userId ?? '0');
    const chatId = String(body?.chat?.id ?? body?.chatId ?? raw.chatId ?? userId);
    return { userId, chatId };
}
function createContext(raw, replyFn) {
    const { userId, chatId } = getIds(raw);
    const msg = raw.message ?? raw.update?.message;
    const body = msg?.body ?? msg ?? raw;
    const text = body?.text ?? '';
    const callbackPayload = raw.callback?.payload ?? raw.payload ?? body?.payload ?? '';
    return {
        userId,
        chatId,
        text: text || undefined,
        callbackPayload: callbackPayload || undefined,
        raw,
        reply: (message, options) => replyFn(message, options),
    };
}
