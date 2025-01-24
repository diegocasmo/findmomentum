"use server";

import { signInSchema, type SignInSchema } from "@/lib/schemas/sign-in";
import { signIn } from "@/lib/auth";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import type { FieldErrors } from "react-hook-form";

type SignInResult =
  | { success: true }
  | { success: false; errors: FieldErrors<SignInSchema> };

export async function signInAction(formData: FormData): Promise<SignInResult> {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    await signIn("resend", {
      email: result.data.email,
      redirect: false,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error) {
    console.error("Error signing in :", error);
    const zodError = createZodError("Failed to sign in. Please try again", [
      "email",
    ]);

    return {
      success: false,
      errors: parseZodErrors(zodError),
    };
  }
}
