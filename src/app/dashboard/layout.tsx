import { TopBav } from "@/components/top-nav";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { NotificationManager } from "@/components/notification-manager";
import { BottomNav } from "@/components/bottom-nav";
import type React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <NotificationManager />
      <div className="flex flex-col min-h-screen">
        <TopBav />
        <main className="flex-grow pt-8 mb-[75px]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </SessionProvider>
  );
}
