import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Small wins. Big progress.
      </h1>
      <p className="text-xl mb-8 text-muted-foreground">
        Track your daily achievements and build momentum towards your goals.
      </p>
      <Button asChild size="lg">
        <Link href="/auth/sign-in">Get Started</Link>
      </Button>
    </section>
  );
};
