import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!process.env.AUTH_RESEND_KEY) {
    throw new Error("AUTH_RESEND_KEY environment variable is not set");
  }

  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL environment variable is not set");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
      },
    });

    // Create new token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires,
      },
    });

    const resend = new Resend(process.env.AUTH_RESEND_KEY);
    const { host } = new URL(process.env.NEXTAUTH_URL);

    if (process.env.NODE_ENV === "development") {
      console.log(`OTP for ${email}: ${otp}`);
    } else {
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Your OTP for ${host}`,
        html: `Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.`,
      });
    }

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
