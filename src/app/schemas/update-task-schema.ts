import { z } from "zod";

import { createTaskSchema } from "@/app/schemas/create-task-schema";

export const updateTaskSchema = z.object({
  taskId: z.string().cuid("Invalid task ID"),
  name: createTaskSchema.shape.name,
  durationMs: createTaskSchema.shape.durationMs,
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
