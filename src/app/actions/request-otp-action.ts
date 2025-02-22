"use server";

import { requestOtp } from "@/lib/services/auth-service";
import { signInSchema } from "@/app/schemas/sign-in-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function requestOtpAction(
  formData: FormData
): Promise<ActionResult> {
  const result = signInSchema.safeParse({ email: formData.get("email") });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    await requestOtp(result.data.email);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to send OTP:", error);

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
