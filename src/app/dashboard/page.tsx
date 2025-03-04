import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getActivities } from "@/lib/services/get-activities";
import { auth } from "@/lib/auth";
import { Home } from "lucide-react";
import { ActivitiesList } from "@/app/dashboard/components/activities-list";
import { PageSkeleton } from "@/app/dashboard/components/page-skeleton";
import { ActivityContributions } from "@/app/dashboard/components/activity-contributions";
import { SourceTopActivitiesList } from "@/app/dashboard/components/source-top-activities-list";
import { Pagination } from "@/app/dashboard/components/pagination";
import { CollapsibleSection } from "@/components/collapsible-section";

type DashboardProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  // Parse page from search params
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page as string, 10) : 1;

  // Get paginated activities
  const { activities, totalPages, currentPage } = await getActivities({
    userId,
    page,
    limit: 10,
  });

  return <PageSkeleton />;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center mb-2 sm:mb-0">
          <Home className="w-6 h-6 md:w-8 md:h-8 mr-2 text-primary" />
          Home
        </h1>

        <CollapsibleSection
          id="activity-completion"
          title="Year-to-date activity completion"
          iconName="check-square"
        >
          <ActivityContributions userId={userId} />
        </CollapsibleSection>

        <CollapsibleSection
          id="top-templates"
          title="Top templates"
          iconName="file-text"
        >
          <SourceTopActivitiesList userId={userId} />
        </CollapsibleSection>

        <CollapsibleSection
          id="activities"
          title="Activities"
          description={`Page ${currentPage} of ${totalPages}`}
          iconName="activity"
        >
          <ActivitiesList activities={activities} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </CollapsibleSection>
      </div>
    </Suspense>
  );
}
