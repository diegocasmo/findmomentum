import type { Activity } from "@prisma/client";
import { ActivityCard } from "@/components/activity-card";
import { NoActivities } from "@/components/no-activities";

type ActivitiesListProps = {
  activities: Activity[];
};

export function ActivitiesList({ activities }: ActivitiesListProps) {
  if (activities.length === 0) {
    return <NoActivities />;
  }

  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li key={activity.id}>
          <ActivityCard activity={activity} />
        </li>
      ))}
    </ul>
  );
}
