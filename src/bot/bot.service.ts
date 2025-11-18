import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot, Context } from 'grammy';

import { commandsComposer } from './commands/commands.composer';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<Context>;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    this.bot = new Bot(token);
    this.setupBot();
  }

  private setupBot() {
    this.bot.use(commandsComposer);

    // Здесь можно добавить другие модули:
    // this.bot.use(handlersComposer);
    // this.bot.use(scenesComposer);

    this.bot.catch((err) => {
      console.error('Ошибка в боте:', err);
    });
  }

  async onModuleInit() {
    await this.bot.start({
      onStart: (botInfo) => {
        console.log(`✓ Бот @${botInfo.username} запущен`);
      },
    });
  }

  async onModuleDestroy() {
    await this.bot.stop();
    console.log('✓ Бот остановлен');
  }

  async sendMessage(chatId: number, text: string) {
    return this.bot.api.sendMessage(chatId, text);
  }

  getBot() {
    return this.bot;
  }

  getBotInfo() {
    return this.bot.botInfo;
  }
}
