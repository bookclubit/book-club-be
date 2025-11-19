import { Composer } from 'grammy';
import { startCommand } from './start.command';
import { helpCommand } from './help.command';

export const commandsComposer = new Composer();

commandsComposer.use(startCommand);
commandsComposer.use(helpCommand);
