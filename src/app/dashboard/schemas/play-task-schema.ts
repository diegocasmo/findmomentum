import { z } from "zod";

export const playTaskSchema = z.object({
  taskId: z.string().uuid(),
});

export type PlayTaskSchema = z.infer<typeof playTaskSchema>;
