import { prisma } from "@/lib/prisma";

export async function generateOTP(email: string): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp,
      expires,
    },
  });

  return otp;
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: otp,
      expires: { gt: new Date() },
    },
  });

  if (verificationToken) {
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return true;
  }

  return false;
}
