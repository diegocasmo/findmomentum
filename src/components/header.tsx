import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold">
        Momentum
      </Link>
      <nav>
        <Button variant="ghost" asChild className="text-base">
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </nav>
    </header>
  );
};
