import { getActivityContributions } from "@/lib/services/get-activity-contributions";
import { ContributionGraph } from "@/app/dashboard/components/contribution-graph";
import { getUserTimezone } from "@/lib/utils/timezone";

type ActivityContributionsProps = {
  userId: string;
  timezone?: string;
};

export async function ActivityContributions({
  userId,
}: ActivityContributionsProps) {
  const timezone = getUserTimezone();
  const contributions = await getActivityContributions({
    userId,
    timezone,
  });

  return (
    <ContributionGraph contributions={contributions} timezone={timezone} />
  );
}
