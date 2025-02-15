import { ActivityCard } from "@/components/activity-card";
import { NoActivities } from "@/components/no-activities";
import type { ActivityWithTasksAndTimeEntries } from "@/types";

type ActivitiesListProps = {
  activities: ActivityWithTasksAndTimeEntries[];
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
