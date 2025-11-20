import { z } from 'zod';

export const prodEnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z
    .string()
    .min(1, 'TELEGRAM_BOT_TOKEN обязателен'),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL обязателен'),

  POSTGRES_USER: z
    .string()
    .min(1, 'POSTGRES_USER обязателен в production'),

  POSTGRES_PASSWORD: z
    .string()
    .min(1, 'POSTGRES_PASSWORD обязателен в production'),

  POSTGRES_DB: z
    .string()
    .min(1, 'POSTGRES_DB обязателен в production'),

  NODE_ENV: z.literal('production'),

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

export type ProdEnv = z.infer<typeof prodEnvSchema>;
