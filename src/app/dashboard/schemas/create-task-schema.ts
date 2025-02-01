import { z } from "zod";

export const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required")
    .max(255, "Task name is too long")
    .transform((v) => v.trim()),
  activityId: z.string().cuid("Invalid activity ID"),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
