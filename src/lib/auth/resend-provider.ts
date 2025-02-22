import ResendProvider from "next-auth/providers/resend";

export const getResendProvider = () => {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  if (!process.env.AUTH_RESEND_KEY) {
    throw new Error("AUTH_RESEND_KEY environment variable is not set");
  }

  return ResendProvider({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: process.env.EMAIL_FROM,
  });
};
