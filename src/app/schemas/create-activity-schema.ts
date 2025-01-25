import { z } from "zod";

export const createActivitySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => v.trim()),
  durationMs: z.number().int().positive(),
});

export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
