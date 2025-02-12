import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Momentum
            </CardTitle>
            <CardDescription className="text-center">
              Build momentum, one task at a time
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            {session && session.user ? (
              <Button asChild>
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </SessionProvider>
  );
}
