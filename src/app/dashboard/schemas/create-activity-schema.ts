import { z } from "zod";

export const createActivitySchema = z.object({
  name: z
    .string()
    .min(1, "Activity name is required")
    .max(100, "Activity name must be 100 characters or less")
    .transform((v) => v.trim()),
});

export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
