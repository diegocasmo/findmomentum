import { prisma } from "@/lib/prisma";
import { getResend } from "@/lib/auth/resend";

export async function requestOtp(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp,
      expires,
    },
  });

  const { host } = new URL(process.env.NEXTAUTH_URL || "");

  if (process.env.NODE_ENV === "development") {
    console.log(`OTP for ${email}: ${otp}`);
  } else {
    const resend = getResend();
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: `Your OTP for ${host}`,
      html: `Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.`,
    });
  }
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: otp,
      expires: { gt: new Date() },
    },
  });

  if (!verificationToken) return false;

  // Delete the verification token after successful verification
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return true;
}
