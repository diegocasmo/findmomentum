import { z } from "zod";

export const toggleBookmarkActivitySchema = z.object({
  activityId: z.string().cuid("Invalid activity ID"),
});

export type ToggleBookmarkActivitySchema = z.infer<
  typeof toggleBookmarkActivitySchema
>;
