import { z } from 'zod';

export const devEnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z
    .string()
    .min(1, 'TELEGRAM_BOT_TOKEN обязателен'),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL обязателен'),

  NODE_ENV: z.literal('development'),

  PORT: z
    .string()
    .min(1, 'PORT обязателен')
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int('PORT должен быть целым числом')
        .positive('PORT должен быть положительным числом'),
    ),
});

export type DevEnv = z.infer<typeof devEnvSchema>;
