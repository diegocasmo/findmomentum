"use server";

import { signInSchema } from "@/app/schemas/sign-in-schema";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function verifyOtpAction(formData: FormData) {
  const email = formData.get("email");
  const otp = formData.get("otp");

  const result = signInSchema.safeParse({ email, otp });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        errors: { root: [error.message] },
      };
    }
    console.error("Failed to verify OTP:", error);
    return {
      success: false,
      errors: { root: ["Failed to verify OTP. Please try again."] },
    };
  }
}
