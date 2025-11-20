import { ZodError } from 'zod';
import { devEnvSchema, DevEnv } from './env.dev';
import { prodEnvSchema, ProdEnv } from './env.prod';

export type Env = DevEnv | ProdEnv;

export function validateEnv(config: Record<string, unknown>): Env {
  const nodeEnv = (config.NODE_ENV ?? process.env.NODE_ENV ?? 'development') as string;
  const schema = nodeEnv === 'production' ? prodEnvSchema : devEnvSchema;

  const parsed = schema.safeParse(config);

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
