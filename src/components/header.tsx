import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Momentum
      </Link>
      <nav>
        <Button variant="ghost" asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </nav>
    </header>
  );
};
