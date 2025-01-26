import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((v) => v.trim()),
});

export type SignInSchema = z.infer<typeof signInSchema>;
