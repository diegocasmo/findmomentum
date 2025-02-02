"use client";

import { useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await signOut({ redirect: false });
        // Perform a hard refresh by redirecting to the root URL
        window.location.href = "/";
      } catch (error) {
        console.error("Sign out error:", error);
        setError("Sign out failed. Please try again.");
      }
    });
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleSignOut}
        disabled={isPending}
        variant="ghost"
        className="w-full justify-start"
      >
        <LogOut className="h-4 w-4 mr-2" />
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
      {error && (
        <p className="text-sm font-medium text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
