"use server";

import { requestOtp } from "@/lib/services/auth-service";
import { signInSchema } from "@/app/schemas/sign-in-schema";

export async function requestOtpAction(formData: FormData) {
  const email = formData.get("email") as string;

  const result = signInSchema.safeParse({ email });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await requestOtp(email);
    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return {
      success: false,
      errors: { root: ["Failed to send OTP. Please try again."] },
    };
  }
}
