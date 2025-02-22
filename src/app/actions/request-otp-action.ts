"use server";

import { requestOtp } from "@/lib/services/request-otp";
import { signInSchema } from "@/app/schemas/sign-in-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import { withRateLimit } from "@/lib/rate-limiter/with-rate-limit";
import type { ActionResult } from "@/types";
import { MS_PER_MIN } from "@/lib/utils/time";

export const requestOtpAction = withRateLimit(
  async (formData: FormData): Promise<ActionResult> => {
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
  },
  "request-otp",
  { limit: 5, window: MS_PER_MIN }
);
