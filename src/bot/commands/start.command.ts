import { Composer } from 'grammy';

export const startCommand = new Composer();

startCommand.command('start', async (ctx) => {
  await ctx.reply('Привет! 👋\n\nЯ бот Книжного клуба. Чем могу помочь?');
});
