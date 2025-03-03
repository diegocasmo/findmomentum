import { getTopSourceActivities } from "@/lib/services/get-top-source-activities";
import { ActivityCard } from "@/app/dashboard/components/activity-card";
import { NoTopSourceActivities } from "@/app/dashboard/components/no-top-source-activities";

type SourceTopActivitiesListProps = {
  userId: string;
};

export async function SourceTopActivitiesList({
  userId,
}: SourceTopActivitiesListProps) {
  const activities = await getTopSourceActivities({ userId });

  if (activities.length === 0) return <NoTopSourceActivities />;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
}
