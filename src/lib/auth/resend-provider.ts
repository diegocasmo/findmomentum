import type { EmailConfig } from "next-auth/providers/email";
import Resend from "next-auth/providers/resend";
import { Resend as ResendClient } from "resend";

const consoleLogVerificationRequest: EmailConfig["sendVerificationRequest"] =
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

const sendVerificationRequest: EmailConfig["sendVerificationRequest"] = async ({
  identifier,
  url,
  provider,
}) => {
  const { host } = new URL(url);
  const resend = new ResendClient(process.env.AUTH_RESEND_KEY);

  const result = await resend.emails.send({
    from: provider.from!,
    to: identifier,
    subject: `Sign in to ${host}`,
    html: `
      <body>
        <h1>Sign in to ${host}</h1>
        <p>Click the link below to sign in:</p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Sign in
          </a>
        </p>
        <p>If the button doesn't work, you can also copy and paste this link:</p>
        <p>${url}</p>
      </body>
    `,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
};

export const getResendProvider = () => {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  if (!process.env.AUTH_RESEND_KEY) {
    throw new Error("AUTH_RESEND_KEY environment variable is not set");
  }

  return Resend({
    from: process.env.EMAIL_FROM,
    sendVerificationRequest:
      process.env.NODE_ENV === "development"
        ? consoleLogVerificationRequest
        : sendVerificationRequest,
  });
};
