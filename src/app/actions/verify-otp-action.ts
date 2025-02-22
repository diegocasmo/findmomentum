"use server";

import { signInSchema } from "@/app/schemas/sign-in-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import { signIn } from "@/lib/auth";
import type { ActionResult } from "@/types";

export async function verifyOtpAction(
  formData: FormData
): Promise<ActionResult> {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    await signIn("credentials", {
      email: result.data.email,
      otp: result.data.otp,
      redirect: false,
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to verify OTP:", error);

    const zodError =
      transformPrismaErrorToZodError(error) ||
      createZodError("An unexpected error occurred. Please try again.", [
        "root",
      ]);
    return {
      success: false,
      errors: parseZodErrors(zodError),
    };
  }
}
