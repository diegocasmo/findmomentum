import { z } from "zod";

const positionSchema = z.union([
  z.literal("top"),
  z.literal("bottom"),
  z.object({
    afterTaskId: z.string().cuid("Invalid task ID"),
  }),
]);

export const updateTaskPositionSchema = z.object({
  taskId: z.string().cuid("Invalid task ID"),
  newPosition: positionSchema,
});

export type UpdateTaskPositionSchema = z.infer<typeof updateTaskPositionSchema>;
