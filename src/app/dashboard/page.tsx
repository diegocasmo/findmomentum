import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getActivities } from "@/lib/services/get-activities";
import { auth } from "@/lib/auth";
import { ActivityIcon, Home, FileText } from "lucide-react";
import { ActivitiesList } from "@/app/dashboard/components/activities-list";
import { DashboardPageSkeleton } from "@/components/dashboard-page-skeleton";
import { getTopSourceActivities } from "@/lib/services/get-top-source-activities";
import { SourceTopActivitiesList } from "@/app/dashboard/components/source-top-activities-list";
import { Pagination } from "@/app/dashboard/components/pagination";

type DashboardProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  // Parse page from search params
  const pageParam = searchParams.page;
  const page = pageParam ? Number.parseInt(pageParam as string, 10) : 1;

  // Get paginated activities
  const { activities, totalPages, currentPage } = await getActivities({
    userId,
    page,
    limit: 10,
  });

  const topSourceActivities = await getTopSourceActivities({ userId });

  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center mb-2 sm:mb-0">
          <Home className="w-6 h-6 md:w-8 md:h-8 mr-2 text-primary" />
          Home
        </h1>

        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-primary" />
          Top templates
        </h2>
        <SourceTopActivitiesList activities={topSourceActivities} />

        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ActivityIcon className="w-5 h-5 mr-2 text-primary" />
          Activities
        </h2>
        <ActivitiesList activities={activities} />
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </Suspense>
  );
}
