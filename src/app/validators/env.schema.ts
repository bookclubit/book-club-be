import { z } from 'zod';

export const envSchema = z.object({
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

  TELEGRAM_BOT_TOKEN: z
    .string()
    .min(1, 'TELEGRAM_BOT_TOKEN обязателен и не может быть пустым'),

  POSTGRES_USER: z
    .string()
    .min(1, 'POSTGRES_USER не может быть пустым'),
  POSTGRES_PASSWORD: z
    .string()
    .min(1, 'POSTGRES_PASSWORD не может быть пустым'),
  POSTGRES_DB: z
    .string()
    .min(1, 'POSTGRES_DB не может быть пустым'),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL не может быть пустым')
    .optional(),
});

export type Env = z.infer<typeof envSchema>;
