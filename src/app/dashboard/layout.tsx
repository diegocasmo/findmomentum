import { MainNav } from "@/components/main-nav";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
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
