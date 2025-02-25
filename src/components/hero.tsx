import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="text-center py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Small wins. Big progress.
      </h1>
      <p className="text-xl sm:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto">
        Track your daily activities and build momentum towards your goals.
      </p>
      <Button asChild size="lg" className="text-lg px-8 py-6">
        <Link href="/auth/sign-in">Get Started</Link>
      </Button>
    </section>
  );
};
