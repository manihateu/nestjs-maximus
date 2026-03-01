# nestjs-maximus

NestJS adapter for **MAX** messenger bot API — полный аналог [nestjs-telegraf](https://github.com/botgram/nestjs-telegraf): декораторы `@Update()`, `@Start()`, `@Help()`, `@On()`, `@Hears()`, `@Context()`, инжект бота через `@InjectBot()`.

- [Документация MAX](https://dev.max.ru/docs/chatbots/bots-coding/hellobot/js)
- [@maxhub/max-bot-api](https://www.npmjs.com/package/@maxhub/max-bot-api)

## Установка

```bash
npm install nestjs-maximus @maxhub/max-bot-api
```

## Быстрый старт (декораторы, как в nestjs-telegraf)

### 1. Модуль и обработчик

**app.module.ts**

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MaximusModule } from 'nestjs-maximus';
import { MaximusUpdate } from './maximus.update';

@Module({
  imports: [
    ConfigModule,
    MaximusModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.getOrThrow<string>('MAX_BOT_TOKEN'),
        commands: [
          { name: 'start', description: 'Запуск' },
          { name: 'help', description: 'Помощь' },
        ],
        include: [MaximusUpdate], // классы с @Update()
      }),
    }),
  ],
  providers: [MaximusUpdate],
})
export class AppModule {}
```

**maximus.update.ts**

```ts
import { Injectable } from '@nestjs/common';
import {
  Update,
  Start,
  Help,
  On,
  Hears,
  Context,
  InjectBot,
  Keyboard,
  type MaximusContext,
} from 'nestjs-maximus';
import type { Bot } from '@maxhub/max-bot-api';

@Update()
@Injectable()
export class MaximusUpdate {
  constructor(@InjectBot() private readonly bot: Bot) {}

  @Start()
  async onStart(@Context() ctx: MaximusContext) {
    await ctx.reply('Привет! Напиши что-нибудь.', {
      keyboard: Keyboard.inlineKeyboard([
        [Keyboard.button.callback('Кнопка', 'btn_1')],
      ]),
    });
  }

  @Help()
  async onHelp(@Context() ctx: MaximusContext) {
    await ctx.reply('Команды: /start, /help');
  }

  @On('message_created')
  async onMessage(@Context() ctx: MaximusContext) {
    await ctx.reply(`Ты написал: ${ctx.text ?? '(пусто)'}`);
  }

  @On('message_callback')
  async onCallback(@Context() ctx: MaximusContext) {
    await ctx.reply(`Нажата кнопка: ${ctx.callbackPayload}`);
  }

  @Hears(/привет/i)
  async onHears(@Context() ctx: MaximusContext) {
    await ctx.reply('И тебе привет!');
  }
}
```

### 2. Переменные окружения

```env
MAX_BOT_TOKEN=ваш_токен_от_Master_Bot
```

Токен: [Master Bot](https://max.ru/masterbot).

---

## API (как в nestjs-telegraf)

### Декораторы

| Декоратор | Описание |
|-----------|----------|
| `@Update()` | Класс-обработчик апдейтов (аналог `@Controller()`) |
| `@Start()` | Команда /start и событие bot_started |
| `@Help()` | Команда /help |
| `@On(event)` | Событие: `'bot_started'`, `'message_created'`, `'message_callback'` |
| `@Hears(trigger)` | Текст или RegExp по сообщению |
| `@Context()` | Внедрить `MaximusContext` в параметр метода |
| `@Message()` | Внедрить текст сообщения (или свойство) |
| `@InjectBot(name?)` | Внедрить экземпляр `Bot` из `@maxhub/max-bot-api` |

### MaximusModule

- **`forRoot(options)`** / **`forRootAsync(options)`**
  - `token: string` — токен бота
  - `commands?: Array<{ name, description }>`
  - **`include: Function[]`** — классы с `@Update()` (обязательно для декораторов)

### MaximusContext

- `userId`, `chatId`, `text?`, `callbackPayload?`, `raw`
- `reply(message, options?)` — ответ в чат (`options.format`, `options.keyboard`)

### Альтернатива: IMaximusUpdateHandler

Можно не использовать декораторы, а реализовать интерфейс `IMaximusUpdateHandler` (метод `handle(ctx: MaximusContext): Promise<void>`) и зарегистрировать провайдер с токеном `MAXIMUS_UPDATE_HANDLER`

### Keyboard

Реэкспорт из `@maxhub/max-bot-api`:

```ts
import { Keyboard } from 'nestjs-maximus';
Keyboard.inlineKeyboard([[Keyboard.button.callback('Текст', 'payload')]]);
```

## Лицензия

MIT
