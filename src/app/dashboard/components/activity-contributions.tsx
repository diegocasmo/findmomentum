import { getActivityContributions } from "@/lib/services/get-activity-contributions";
import { ContributionGraph } from "@/app/dashboard/components/contribution-graph";

type ActivityContributionsProps = {
  userId: string;
};

export async function ActivityContributions({
  userId,
}: ActivityContributionsProps) {
  const contributions = await getActivityContributions({ userId });

  return <ContributionGraph contributions={contributions} />;
}
