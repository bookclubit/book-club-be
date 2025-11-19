import { Composer } from 'grammy';

export const helpCommand = new Composer();

helpCommand.command('help', async (ctx) => {
  await ctx.reply(
    'Доступные команды:\n' +
      '/start - Быстрая регистрация\n' +
      '/help - Показать эту справку\n',
  );
});
