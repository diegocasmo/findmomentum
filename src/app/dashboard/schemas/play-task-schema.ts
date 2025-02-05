import { z } from "zod";

export const playTaskSchema = z.object({
  taskId: z.string().cuid("Invalid task ID"),
});

export type PlayTaskSchema = z.infer<typeof playTaskSchema>;
