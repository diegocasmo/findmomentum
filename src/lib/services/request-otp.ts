import { prisma } from "@/lib/prisma";
import { getResend } from "@/lib/auth/resend";

export async function requestOtp(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (!nextAuthUrl) {
    throw new Error("NEXTAUTH_URL is not set in the environment variables");
  }

  const emailFrom = process.env.EMAIL_FROM;
  if (!emailFrom) {
    throw new Error("EMAIL_FROM is not set in the environment variables");
  }

  const { host } = new URL(nextAuthUrl);

  await prisma.$transaction(async (tx) => {
    await tx.verificationToken.deleteMany({
      where: { identifier: email },
    });

    await tx.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires,
      },
    });
  });

  if (process.env.NODE_ENV === "development") {
    console.log(`OTP for ${email}: ${otp}`);
  } else {
    const resend = getResend();
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: `Your One-Time Password for ${host}`,
      html: `Your one-time password is: <strong>${otp}</strong>. It will expire in 10 minutes.`,
    });
  }
}
