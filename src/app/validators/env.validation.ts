import { ZodError } from 'zod';
import { envSchema, Env } from './env.schema';

export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    const error = parsed.error as ZodError;

    const messages = error.issues
      .map((issue) => {
        const path = issue.path.join('.') || 'общая ошибка';
        return `• ${path}: ${issue.message}`;
      })
      .join('\n');

    console.error('Ошибка валидации переменных окружения:\n' + messages);
    throw new Error('Некорректные переменные окружения. Проверьте .env файл.');
  }

  return parsed.data;
}
