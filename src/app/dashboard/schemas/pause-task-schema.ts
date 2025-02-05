import { z } from "zod";

export const pauseTaskSchema = z.object({
  taskId: z.string().uuid(),
});

export type PauseTaskSchema = z.infer<typeof pauseTaskSchema>;
