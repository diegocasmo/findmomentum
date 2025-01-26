import { z } from "zod";
import { MS_PER_MIN, MS_PER_SECOND } from "@/lib/utils/time";

export const MAX_MIN = 59;
export const MAX_SEC = 59;

const MAX_DURATION_MS = MAX_MIN * MS_PER_MIN + MAX_SEC * MS_PER_SECOND;

export const createActivitySchema = z.object({
  name: z
    .string()
    .min(1, "Activity name is required")
    .max(100, "Activity name must be 100 characters or less")
    .transform((v) => v.trim()),
  durationMs: z
    .number()
    .int()
    .positive("Duration must be a positive number")
    .max(MAX_DURATION_MS, "Duration must be 59:59 or less"), // Maximum of 59:59 in milliseconds
});

export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
