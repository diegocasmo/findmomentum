import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { computeTaskRemainingTime } from "@/lib/utils/compute-task-remaining-time";

export function computeActivityRemainingTime(
  activity: ActivityWithTasksAndTimeEntries
): number {
  return activity.tasks.reduce(
    (sum, task) => sum + computeTaskRemainingTime(task),
    0
  );
}
