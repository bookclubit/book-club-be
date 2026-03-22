import * as z from 'zod';

export const CreateFeatureFlagSchema = z.object({
  name: z.string().min(1),
  enabled: z.boolean().optional().default(false),
  description: z.string().optional(),
});

export type CreateFeatureFlagDto = z.infer<typeof CreateFeatureFlagSchema>;
