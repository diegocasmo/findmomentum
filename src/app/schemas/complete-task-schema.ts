import { z } from "zod";

export const completeTaskSchema = z.object({
  taskId: z.string().cuid("Invalid task ID"),
});

export type CompleteTaskSchema = z.infer<typeof completeTaskSchema>;
