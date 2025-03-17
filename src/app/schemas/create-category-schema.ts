import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(255, "Category name is too long")
    .transform((v) => v.trim()),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
