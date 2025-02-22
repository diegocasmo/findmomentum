import { Resend } from "resend";

export const getResend = () => {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  return new Resend(process.env.AUTH_RESEND_KEY);
};
