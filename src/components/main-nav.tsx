import Link from "next/link";
import { UserNav } from "@/components/user-nav";

export async function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-4">
              <span className="font-bold text-lg">Momentum</span>
              <span className="hidden md:inline text-sm text-muted-foreground">
                Build momentum, one focused time block at a time
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
