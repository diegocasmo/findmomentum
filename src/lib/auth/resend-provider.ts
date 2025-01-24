import type { EmailConfig } from "next-auth/providers/email";
import Resend from "next-auth/providers/resend";

const sendVerificationRequestDev: EmailConfig["sendVerificationRequest"] =
  async ({ identifier, url, provider }) => {
    const { host } = new URL(url);

    console.log(`
----------------------------------
From: ${provider.from}
To: ${identifier}
Subject: Sign in to ${host}

Sign in URL:

${url}

----------------------------------
  `);
  };

export const getResendProvider = () => {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  return Resend({
    from: process.env.EMAIL_FROM,
    // Send email verification requests to the console in development to avoid
    // spamming the Resend API
    ...(process.env.NODE_ENV === "development"
      ? { sendVerificationRequest: sendVerificationRequestDev }
      : {}),
  });
};
