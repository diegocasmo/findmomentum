import { MainNav } from "@/components/main-nav";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { NotificationManager } from "@/components/notification-manager";

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
        <MainNav />
        <main className="flex-grow py-8">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
