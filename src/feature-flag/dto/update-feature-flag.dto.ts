import * as z from 'zod';

export const UpdateFeatureFlagSchema = z.object({
  enabled: z.boolean().optional(),
  description: z.string().optional(),
});

export type UpdateFeatureFlagDto = z.infer<typeof UpdateFeatureFlagSchema>;
