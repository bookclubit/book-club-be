import { readFileSync } from 'node:fs';
import {
  fullHeaderRegex,
  ticketRegex,
  sepRegex,
  mergeRegex,
} from './constants.js';

const msgPath = process.argv[2];

if (!msgPath) {
  console.error('❌ Ошибка: Не передан путь к файл c именем коммита.');
  process.exit(1);
}

try {
  const rawMsg = readFileSync(msgPath, 'utf-8');
  const header = rawMsg.split('\n')[0].trim();

  // Быстрая проверка: если всё ок, уходим сразу
  if (mergeRegex.test(header) || fullHeaderRegex.test(header)) {
    process.exit(0);
  }

  console.log('\n⚠️  ---------------------------------------------------');
  console.log('   Сообщение коммита не соответствует стандарту.');
  console.log('   Заголовок: ' + header);
  console.log('---------------------------------------------------\n');

  let hasError = false;

  if (!ticketRegex.test(header)) {
    console.error('🔴 Отсутствует номер задачи, к которой относится коммит.');
    console.error('   👉 Добавь в конец: #1234\n');
    hasError = true;
  }

  if (!sepRegex.test(header)) {
    console.error('🔴 Нет разделителя (скорее всего `: `) после типа.');
    hasError = true;
  }

  if (!hasError) {
    console.error('🔴 Сверься с паттерном ниже');
  }

  console.log('✅ Ожидаемый формат: feat(auth): add login #42\n');
  process.exit(1);
} catch (error) {
  console.error(
    '❌ Ошибка чтения файла. Не могу провалидировать коммит. Сообщи команде и не потеряй код.',
    error,
  );
  process.exit(1);
}
