"use server";

import { signInSchema, type SignInSchema } from "@/app/schemas/sign-in-schema";
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
    const res = await signIn("resend", {
      email: result.data.email,
      redirect: false,
      redirectTo: "/dashboard",
    });
    console.log("----------HERE----------");
    console.log(res);
    return { success: true };
  } catch (error) {
    console.error("Error signing in :", error);
    const zodError = createZodError("Failed to sign in. Please try again", [
      "root",
    ]);

    return {
      success: false,
      errors: parseZodErrors(zodError),
    };
  }
}
