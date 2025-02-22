"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      setStep("otp");
    } else {
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });
    if (result?.error) {
      alert("Invalid OTP. Please try again.");
    } else {
      // Redirect to the desired page after successful sign-in
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={step === "email" ? handleRequestOTP : handleVerifyOTP}
      className="space-y-4"
    >
      {step === "email" ? (
        <>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button type="submit">Request OTP</Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <Button type="submit">Verify OTP</Button>
        </>
      )}
    </form>
  );
}
