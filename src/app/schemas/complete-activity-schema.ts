import { z } from "zod";

export const completeActivitySchema = z.object({
  activityId: z.string().cuid("Invalid activity ID"),
});

export type CompleteActivitySchema = z.infer<typeof completeActivitySchema>;
