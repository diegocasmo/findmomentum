import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getActivities } from "@/lib/services/get-activities";
import { auth } from "@/lib/auth";
import { ActivityIcon } from "lucide-react";
import { ActivitiesList } from "@/components/activities-list";
import { DashboardPageSkeleton } from "@/components/dashboard-page-skeleton";
import { ActivityTabs } from "@/components/activity-tabs";

type DashboardProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const tab = searchParams.tab as string | undefined;
  const completed = tab === "completed";

  const activities = await getActivities({ userId, completed });

  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center mb-2 sm:mb-0">
          <ActivityIcon className="w-6 h-6 md:w-8 md:h-8 mr-2 text-primary" />
          Activities
        </h1>
        <ActivityTabs />
        <ActivitiesList activities={activities} />
      </div>
    </Suspense>
  );
}
