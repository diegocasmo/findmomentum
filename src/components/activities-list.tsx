import type { Activity } from "@prisma/client";
import { ActivityCard } from "@/components/activity-card";

type ActivitiesListProps = {
  activities: Activity[];
};

export function ActivitiesList({ activities }: ActivitiesListProps) {
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
