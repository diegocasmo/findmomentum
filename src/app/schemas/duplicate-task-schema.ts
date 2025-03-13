import { z } from "zod";

export const duplicateTaskSchema = z.object({
  taskId: z.string().cuid("Invalid task ID"),
});

export type DuplicateTaskSchema = z.infer<typeof duplicateTaskSchema>;
